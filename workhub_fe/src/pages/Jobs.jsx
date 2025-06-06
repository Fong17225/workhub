import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  BriefcaseIcon, 
  BuildingOfficeIcon, 
  MapPinIcon, 
  CurrencyDollarIcon,
  ClockIcon,
  CalendarIcon,
  TagIcon
} from '@heroicons/react/24/outline';

function Jobs() {
  const [filters, setFilters] = useState({
    title: '',
    typeId: '',
    categoryId: '',
    location: '',
    minSalary: '',
    maxSalary: '',
    positionId: '',
    skillId: ''
  });

  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const response = await axios.get(`http://localhost:8080/workhub/api/v1/jobs?${params.toString()}`);
      return response.data;
    }
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-3 mt-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Có lỗi xảy ra</h3>
          <p className="mt-1 text-sm text-gray-500">Vui lòng thử lại sau</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Bộ lọc tìm kiếm</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
            <input
              type="text"
              name="title"
              id="title"
              value={filters.title}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Địa điểm</label>
            <input
              type="text"
              name="location"
              id="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="minSalary" className="block text-sm font-medium text-gray-700">Lương tối thiểu</label>
            <input
              type="number"
              name="minSalary"
              id="minSalary"
              value={filters.minSalary}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="maxSalary" className="block text-sm font-medium text-gray-700">Lương tối đa</label>
            <input
              type="number"
              name="maxSalary"
              id="maxSalary"
              value={filters.maxSalary}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-6">
        {jobs?.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  <Link to={`/jobs/detail/${job.id}`} className="hover:text-primary">
                    {job.title}
                  </Link>
                </h3>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <BuildingOfficeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  {job.recruiter?.companyName}
                </div>
              </div>
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  job.postAt === 'urgent' ? 'bg-red-100 text-red-800' :
                  job.postAt === 'proposal' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {job.postAt === 'urgent' ? 'Khẩn cấp' :
                   job.postAt === 'proposal' ? 'Đề xuất' :
                   'Tiêu chuẩn'}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* <div className="flex items-center text-sm text-gray-500">
                <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                {job.position?.name}
              </div> */}
              <div className="flex items-center text-sm text-gray-500">
                <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                {job.location}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                {job.salaryRange}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                {job.type?.name}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <TagIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <span className="font-medium">Ngành nghề:</span>
                <span className="ml-2">{job.category?.name}</span>
              </div>
              {/* <div className="flex flex-wrap gap-2">
                {job.skills?.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {skill.name}
                  </span>
                ))}
              </div> */}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <div>
                  <div>Đăng: {new Date(job.createdAt).toLocaleDateString('vi-VN')}</div>
                  {job.deadline && (
                    <div>Hạn nộp: {new Date(job.deadline).toLocaleDateString('vi-VN')}</div>
                  )}
                </div>
              </div>
              <Link
                to={`/jobs/${job.id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}

        {jobs?.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Không tìm thấy việc làm phù hợp</h3>
            <p className="mt-1 text-sm text-gray-500">Vui lòng thử lại với bộ lọc khác</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs; 