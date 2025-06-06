import 'package:flutter/material.dart';
import 'package:workhub_mb/widgets/job_card.dart';
import 'package:workhub_mb/services/job_service.dart';
import 'package:workhub_mb/models/job.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _searchController = TextEditingController();
  List<Job>? _featuredJobs;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadFeaturedJobs();
  }

  Future<void> _loadFeaturedJobs() async {
    try {
      final jobs = await JobService.getJobs();
      setState(() {
        _featuredJobs = jobs.take(3).toList();
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Lỗi khi tải dữ liệu việc làm')),
      );
    }
  }

  void _handleSearch() {
    if (_searchController.text.trim().isNotEmpty) {
      Navigator.pushNamed(
        context,
        '/jobs',
        arguments: _searchController.text.trim(),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('WorkHub'),
        actions: [
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () => Navigator.pushNamed(context, '/profile'),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Hero Section
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Theme.of(context).primaryColor,
                    Theme.of(context).primaryColor.withOpacity(0.8),
                  ],
                ),
              ),
              padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 20),
              child: Column(
                children: [
                  const Text(
                    'Tìm việc làm mơ ước của bạn',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Hàng nghìn cơ hội việc làm đang chờ đón bạn',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Row(
                      children: [
                        const Icon(Icons.search, color: Colors.grey),
                        const SizedBox(width: 8),
                        Expanded(
                          child: TextField(
                            controller: _searchController,
                            decoration: const InputDecoration(
                              hintText: 'Tìm kiếm việc làm, kỹ năng, công ty...',
                              border: InputBorder.none,
                            ),
                            onSubmitted: (_) => _handleSearch(),
                          ),
                        ),
                        TextButton(
                          onPressed: _handleSearch,
                          child: const Text('Tìm kiếm'),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // Features Section
            Container(
              padding: const EdgeInsets.all(20),
              color: Colors.grey[100],
              child: Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: _buildFeatureCard(
                          icon: Icons.work,
                          title: 'Tìm việc làm phù hợp',
                          description: 'Khám phá hàng nghìn cơ hội việc làm từ các công ty hàng đầu',
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: _buildFeatureCard(
                          icon: Icons.business,
                          title: 'Kết nối với nhà tuyển dụng',
                          description: 'Tương tác trực tiếp với các nhà tuyển dụng uy tín',
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: _buildFeatureCard(
                          icon: Icons.school,
                          title: 'Phát triển sự nghiệp',
                          description: 'Cập nhật kỹ năng và kiến thức mới nhất từ các chuyên gia',
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Featured Jobs Section
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Việc làm nổi bật',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  if (_isLoading)
                    const Center(child: CircularProgressIndicator())
                  else if (_featuredJobs != null)
                    ListView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: _featuredJobs!.length,
                      itemBuilder: (context, index) {
                        return JobCard(job: _featuredJobs![index]);
                      },
                    ),
                  const SizedBox(height: 16),
                  Center(
                    child: ElevatedButton(
                      onPressed: () => Navigator.pushNamed(context, '/jobs'),
                      child: const Text('Xem tất cả việc làm'),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFeatureCard({
    required IconData icon,
    required String title,
    required String description,
  }) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Icon(icon, size: 40, color: Theme.of(context).primaryColor),
            const SizedBox(height: 16),
            Text(
              title,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              description,
              style: TextStyle(
                fontSize: 14,
                color: Colors.grey[600],
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
} 