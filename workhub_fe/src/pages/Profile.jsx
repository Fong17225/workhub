import { useState } from 'react';
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

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <img
                  src="https://via.placeholder.com/120"
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold">Nguyễn Văn A</h2>
                <p className="text-gray-600">Frontend Developer</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg ${
                    activeTab === 'profile'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Edit className="mr-3" />
                  Thông tin cá nhân
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg ${
                    activeTab === 'saved'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Bookmark className="mr-3" />
                  Việc làm đã lưu
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg ${
                    activeTab === 'history'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <History className="mr-3" />
                  Lịch sử ứng tuyển
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg ${
                    activeTab === 'settings'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="mr-3" />
                  Cài đặt
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Thông tin cá nhân</h2>
                  <button className="text-primary hover:text-primary/80">
                    <Edit />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Thông tin cơ bản</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-600">
                        <Email className="mr-2" />
                        <span>nguyenvana@email.com</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="mr-2" />
                        <span>0123 456 789</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <LocationOn className="mr-2" />
                        <span>Hà Nội, Việt Nam</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Work className="mr-2" />
                        <span>3 năm kinh nghiệm</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Kỹ năng</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        React
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        TypeScript
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        Tailwind CSS
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        Node.js
                      </span>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Học vấn</h3>
                    <div className="space-y-4">
                      <div className="border-l-2 border-primary pl-4">
                        <h4 className="font-semibold">Đại học Bách Khoa Hà Nội</h4>
                        <p className="text-gray-600">Cử nhân Công nghệ Thông tin</p>
                        <p className="text-gray-500 text-sm">2018 - 2022</p>
                      </div>
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Kinh nghiệm làm việc</h3>
                    <div className="space-y-4">
                      <div className="border-l-2 border-primary pl-4">
                        <h4 className="font-semibold">Frontend Developer</h4>
                        <p className="text-gray-600">Tech Company</p>
                        <p className="text-gray-500 text-sm">2022 - Hiện tại</p>
                        <p className="text-gray-600 mt-2">
                          Phát triển và duy trì các ứng dụng web sử dụng React và
                          TypeScript.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Liên kết mạng xã hội</h3>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="text-gray-600 hover:text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedIn />
                      </a>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitHub />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6">Việc làm đã lưu</h2>
                <div className="space-y-4">
                  {/* Saved Job Card */}
                  <div className="border-b pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <img
                          src="https://via.placeholder.com/50"
                          alt="Company Logo"
                          className="w-12 h-12 rounded-lg"
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold">Senior Frontend Developer</h3>
                          <p className="text-gray-600">Tech Company</p>
                          <div className="flex items-center text-gray-500 mt-2">
                            <LocationOn className="text-sm mr-1" />
                            <span className="text-sm mr-4">Hà Nội</span>
                            <Work className="text-sm mr-1" />
                            <span className="text-sm">Toàn thời gian</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-primary font-semibold">30-40M</p>
                        <p className="text-gray-500 text-sm">Đăng 2 ngày trước</p>
                      </div>
                    </div>
                  </div>
                  {/* Repeat for more saved jobs */}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6">Lịch sử ứng tuyển</h2>
                <div className="space-y-4">
                  {/* Application History Card */}
                  <div className="border-b pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <img
                          src="https://via.placeholder.com/50"
                          alt="Company Logo"
                          className="w-12 h-12 rounded-lg"
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold">Senior Frontend Developer</h3>
                          <p className="text-gray-600">Tech Company</p>
                          <div className="flex items-center text-gray-500 mt-2">
                            <LocationOn className="text-sm mr-1" />
                            <span className="text-sm">Hà Nội</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                          Đang xem xét
                        </span>
                        <p className="text-gray-500 text-sm mt-2">Ứng tuyển 2 ngày trước</p>
                      </div>
                    </div>
                  </div>
                  {/* Repeat for more application history */}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6">Cài đặt</h2>
                <div className="space-y-6">
                  {/* Notification Settings */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Cài đặt thông báo</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Thông báo việc làm mới</p>
                          <p className="text-gray-600 text-sm">
                            Nhận thông báo khi có việc làm phù hợp
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Thông báo ứng tuyển</p>
                          <p className="text-gray-600 text-sm">
                            Nhận thông báo về trạng thái ứng tuyển
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Cài đặt bảo mật</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Hiển thị thông tin liên hệ</p>
                          <p className="text-gray-600 text-sm">
                            Cho phép nhà tuyển dụng xem thông tin liên hệ
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                      Xóa tài khoản
                    </button>
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