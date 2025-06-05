import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LocationOn,
  Work,
  Business,
  School,
  AccessTime,
  AttachMoney,
  Share,
  Bookmark,
  BookmarkBorder,
} from '@mui/icons-material';

const JobDetails = () => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Company Logo"
                    className="w-20 h-20 rounded-lg"
                  />
                  <div className="ml-4">
                    <h1 className="text-2xl font-bold">Senior Frontend Developer</h1>
                    <p className="text-gray-600 text-lg">Tech Company</p>
                    <div className="flex items-center text-gray-500 mt-2">
                      <LocationOn className="text-sm mr-1" />
                      <span className="text-sm mr-4">Hà Nội</span>
                      <Work className="text-sm mr-1" />
                      <span className="text-sm">Toàn thời gian</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className="text-gray-600 hover:text-primary"
                  >
                    {isSaved ? <Bookmark /> : <BookmarkBorder />}
                  </button>
                  <button className="text-gray-600 hover:text-primary">
                    <Share />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600">
                  <AttachMoney className="mr-2" />
                  <span>30-40M</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <School className="mr-2" />
                  <span>3-5 năm kinh nghiệm</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <AccessTime className="mr-2" />
                  <span>Đăng 2 ngày trước</span>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 font-semibold">
                  Ứng tuyển ngay
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Mô tả công việc</h2>
              <div className="prose max-w-none">
                <p>
                  Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm
                  để tham gia vào đội ngũ phát triển sản phẩm của chúng tôi.
                </p>
                <h3 className="text-lg font-semibold mt-6 mb-3">
                  Yêu cầu công việc:
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Tối thiểu 3 năm kinh nghiệm phát triển frontend với React
                  </li>
                  <li>
                    Thành thạo JavaScript/TypeScript và các framework hiện đại
                  </li>
                  <li>
                    Có kinh nghiệm với các công nghệ như Redux, GraphQL, và
                    RESTful APIs
                  </li>
                  <li>
                    Hiểu biết về responsive design và cross-browser compatibility
                  </li>
                  <li>
                    Có khả năng làm việc độc lập và trong môi trường team
                  </li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">
                  Quyền lợi:
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mức lương cạnh tranh</li>
                  <li>Bảo hiểm sức khỏe cao cấp</li>
                  <li>Môi trường làm việc năng động, sáng tạo</li>
                  <li>Cơ hội phát triển nghề nghiệp</li>
                  <li>Chế độ nghỉ phép linh hoạt</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Thông tin công ty</h2>
              <div className="flex items-center mb-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Company Logo"
                  className="w-12 h-12 rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="font-semibold">Tech Company</h3>
                  <p className="text-gray-600">Công nghệ</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <Business className="mr-2" />
                  <span>100-500 nhân viên</span>
                </p>
                <p className="flex items-center">
                  <LocationOn className="mr-2" />
                  <span>Hà Nội, Việt Nam</span>
                </p>
              </div>
              <Link
                to="/companies/1"
                className="block text-center text-primary hover:text-primary/80 mt-4"
              >
                Xem trang công ty →
              </Link>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Việc làm tương tự</h2>
              <div className="space-y-4">
                {/* Similar Job Card */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold">Frontend Developer</h3>
                  <p className="text-gray-600 text-sm">Another Company</p>
                  <div className="flex items-center text-gray-500 mt-2">
                    <LocationOn className="text-sm mr-1" />
                    <span className="text-sm">Hà Nội</span>
                  </div>
                  <Link
                    to="/jobs/2"
                    className="text-primary hover:text-primary/80 text-sm mt-2 inline-block"
                  >
                    Xem chi tiết →
                  </Link>
                </div>
                {/* Repeat for more similar jobs */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails; 