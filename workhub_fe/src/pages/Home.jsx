import { Link } from 'react-router-dom';
import { Search, Work, Business, School } from '@mui/icons-material';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tìm việc làm mơ ước của bạn
            </h1>
            <p className="text-xl mb-8">
              Hàng nghìn cơ hội việc làm đang chờ đón bạn
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center bg-white rounded-lg p-2">
                <Search className="text-gray-400 ml-2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm việc làm, kỹ năng, công ty..."
                  className="flex-1 px-4 py-2 focus:outline-none text-gray-900"
                />
                <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Work className="text-primary text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tìm việc làm phù hợp</h3>
              <p className="text-gray-600">
                Khám phá hàng nghìn cơ hội việc làm từ các công ty hàng đầu
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Business className="text-primary text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Kết nối với nhà tuyển dụng</h3>
              <p className="text-gray-600">
                Tương tác trực tiếp với các nhà tuyển dụng uy tín
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <School className="text-primary text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phát triển sự nghiệp</h3>
              <p className="text-gray-600">
                Cập nhật kỹ năng và kiến thức mới nhất từ các chuyên gia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Jobs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Việc làm nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Job Card */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Company Logo"
                  className="w-12 h-12 rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="font-semibold">Senior Frontend Developer</h3>
                  <p className="text-gray-600">Tech Company</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <span className="mr-4">Hà Nội</span>
                <span>30-40M</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
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
              <Link
                to="/jobs/1"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Xem chi tiết →
              </Link>
            </div>
            {/* Repeat Job Card structure for more jobs */}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/jobs"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90"
            >
              Xem tất cả việc làm
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn sàng tìm việc làm mơ ước?
          </h2>
          <p className="text-xl mb-8">
            Tạo tài khoản ngay hôm nay và bắt đầu hành trình tìm kiếm việc làm
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Đăng ký miễn phí
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 