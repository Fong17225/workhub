import 'package:flutter/material.dart';
import 'package:workhub_mb/models/job.dart';
import 'package:workhub_mb/services/job_service.dart';
import 'package:workhub_mb/widgets/job_card.dart';

class JobsScreen extends StatefulWidget {
  const JobsScreen({Key? key}) : super(key: key);

  @override
  State<JobsScreen> createState() => _JobsScreenState();
}

class _JobsScreenState extends State<JobsScreen> {
  final TextEditingController _searchController = TextEditingController();
  List<Job>? _jobs;
  bool _isLoading = true;
  String? _searchQuery;

  @override
  void initState() {
    super.initState();
    _loadJobs();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final args = ModalRoute.of(context)?.settings.arguments as String?;
    if (args != null && args != _searchQuery) {
      _searchQuery = args;
      _searchController.text = args;
      _loadJobs();
    }
  }

  Future<void> _loadJobs() async {
    try {
      final jobs = await JobService.getJobs();
      setState(() {
        if (_searchQuery != null && _searchQuery!.isNotEmpty) {
          _jobs = jobs
              .where((job) =>
                  job.title.toLowerCase().contains(_searchQuery!.toLowerCase()) ||
                  job.recruiterName.toLowerCase().contains(_searchQuery!.toLowerCase()))
              .toList();
        } else {
          _jobs = jobs;
        }
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Lỗi khi tải dữ liệu việc làm')),
        );
      }
    }
  }

  void _handleSearch() {
    setState(() {
      _searchQuery = _searchController.text.trim();
      _isLoading = true;
    });
    _loadJobs();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Danh sách việc làm'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _searchController,
                    decoration: const InputDecoration(
                      hintText: 'Tìm kiếm việc làm...',
                      prefixIcon: Icon(Icons.search),
                      border: OutlineInputBorder(),
                    ),
                    onSubmitted: (_) => _handleSearch(),
                  ),
                ),
                const SizedBox(width: 16),
                ElevatedButton(
                  onPressed: _handleSearch,
                  child: const Text('Tìm kiếm'),
                ),
              ],
            ),
          ),
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _jobs == null || _jobs!.isEmpty
                    ? const Center(
                        child: Text('Không tìm thấy việc làm phù hợp'),
                      )
                    : ListView.builder(
                        padding: const EdgeInsets.all(16),
                        itemCount: _jobs!.length,
                        itemBuilder: (context, index) {
                          return JobCard(job: _jobs![index]);
                        },
                      ),
          ),
        ],
      ),
    );
  }
} 