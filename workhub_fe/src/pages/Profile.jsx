import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Edit,
  LocationOn,
  Work,
  School,
  Email,
  Phone,
  LinkedIn,
  GitHub,
  Bookmark,
  History,
  Settings,
} from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8080/workhub/api/v1/me', {
        withCredentials: true
      });
      return response.data;
    },
    staleTime: Infinity,
  });

  const { data: savedJobs, isLoading: isLoadingSaved, isError: isErrorSaved } = useQuery({
    queryKey: ['savedJobs', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const response = await axios.get(`http://localhost:8080/workhub/api/v1/saved-jobs?userId=${user.id}`);
      return response.data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="md:col-span-3">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
              <PersonIcon className="h-16 w-16 text-gray-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.fullName}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <nav className="p-4">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    activeTab === 'profile'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <PersonIcon />
                  <span>Hồ sơ</span>
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    activeTab === 'saved'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Bookmark />
                  <span>Việc làm đã lưu ({isLoadingSaved ? '...' : savedJobs?.length || 0})</span>
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    activeTab === 'history'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <History />
                  <span>Lịch sử ứng tuyển</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    activeTab === 'settings'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings />
                  <span>Cài đặt</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Thông tin cá nhân</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Thông tin cơ bản</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                        <p className="mt-1 text-gray-900">{user.fullName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                        <p className="mt-1 text-gray-900">{user.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                        <p className="mt-1 text-gray-900">{user.address}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Kỹ năng</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Học vấn</h3>
                    <div className="space-y-4">
                      {user.education?.map((edu, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <School />
                          <div>
                            <h4 className="font-medium">{edu.school}</h4>
                            <p className="text-gray-600">{edu.degree}</p>
                            <p className="text-sm text-gray-500">
                              {edu.startDate} - {edu.endDate}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Kinh nghiệm làm việc</h3>
                    <div className="space-y-4">
                      {user.experience?.map((exp, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <Work />
                          <div>
                            <h4 className="font-medium">{exp.company}</h4>
                            <p className="text-gray-600">{exp.position}</p>
                            <p className="text-sm text-gray-500">
                              {exp.startDate} - {exp.endDate}
                            </p>
                            <p className="mt-2 text-gray-700">{exp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Liên kết</h3>
                    <div className="space-y-2">
                      {user.socialLinks?.map((link, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {link.platform}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Việc làm đã lưu</h2>
                {isLoadingSaved ? (
                  <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                ) : isErrorSaved ? (
                  <div className="text-center text-red-500 text-sm">Không thể tải danh sách việc làm đã lưu.</div>
                ) : savedJobs?.length > 0 ? (
                  <div className="space-y-4">
                    {savedJobs.map((savedJob) => (
                      <div key={savedJob.id} className="border-b pb-4 last:border-b-0">
                        <h3 className="font-semibold">
                          <Link to={`/jobs/${savedJob.jobId}`} className="hover:text-primary">
                            {savedJob.jobTitle || '[Tiêu đề trống]'}
                          </Link>
                        </h3>
                        <p className="text-gray-600 text-sm">{savedJob.companyName || '[Công ty ẩn danh]'}</p>
                        <div className="flex items-center text-gray-500 mt-2">
                          <LocationOn className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          <span>Địa điểm: {savedJob.location || 'N/A'}</span>
                        </div>
                        <div className="flex items-center text-gray-500 mt-2">
                          <span>Mức lương: {savedJob.salaryRange || 'Thương lượng'}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <span>Đã lưu vào: {new Date(savedJob.savedAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-sm">Bạn chưa lưu việc làm nào.</div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Lịch sử ứng tuyển</h2>
                <div className="space-y-4">
                  {/* Application history will be mapped here */}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Cài đặt</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Thông báo</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email thông báo</p>
                          <p className="text-sm text-gray-500">
                            Nhận thông báo qua email về việc làm mới
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Bảo mật</h3>
                    <div className="space-y-4">
                      <button className="text-red-600 hover:text-red-700">
                        Xóa tài khoản
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 