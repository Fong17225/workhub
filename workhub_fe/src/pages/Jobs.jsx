import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FilterList, LocationOn, Work } from '@mui/icons-material';

const Jobs = () => {
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    experience: '',
    salary: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search and Filters */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm việc làm, kỹ năng, công ty..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Địa điểm</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="danang">Đà Nẵng</option>
              </select>
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Loại công việc</option>
                <option value="fulltime">Toàn thời gian</option>
                <option value="parttime">Bán thời gian</option>
                <option value="remote">Làm từ xa</option>
              </select>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center">
                <FilterList className="mr-2" />
                Bộ lọc
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Bộ lọc nâng cao</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kinh nghiệm
                </label>
                <select
                  name="experience"
                  value={filters.experience}
                  onChange={handleFilterChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Tất cả</option>
                  <option value="intern">Thực tập sinh</option>
                  <option value="junior">Junior (0-2 năm)</option>
                  <option value="middle">Middle (2-5 năm)</option>
                  <option value="senior">Senior (5+ năm)</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức lương
                </label>
                <select
                  name="salary"
                  value={filters.salary}
                  onChange={handleFilterChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Tất cả</option>
                  <option value="0-10">Dưới 10M</option>
                  <option value="10-20">10M - 20M</option>
                  <option value="20-30">20M - 30M</option>
                  <option value="30+">Trên 30M</option>
                </select>
              </div>

              <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                Áp dụng bộ lọc
              </button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* Job Card */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Company Logo"
                      className="w-12 h-12 rounded-lg"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">
                        Senior Frontend Developer
                      </h3>
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
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      React
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      TypeScript
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      Tailwind
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to="/jobs/1"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Xem chi tiết →
                  </Link>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                    Ứng tuyển ngay
                  </button>
                </div>
              </div>

              {/* Repeat Job Card structure for more jobs */}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                  Trước
                </button>
                <button className="px-3 py-1 border rounded-lg bg-primary text-white">
                  1
                </button>
                <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                  Sau
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs; 