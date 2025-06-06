import 'package:workhub_mb/models/job.dart';
import 'package:workhub_mb/services/api_service.dart';
import 'package:workhub_mb/models/job_category.dart';
import 'package:workhub_mb/models/job_type.dart';
import 'dart:developer' as developer;

class JobService {
  final ApiService _api = ApiService();

  Future<List<Job>> getJobs({
    String? title,
    int? typeId,
    int? categoryId,
    String? location,
    double? minSalary,
    double? maxSalary,
    int? positionId,
    int? skillId,
  }) async {
    final queryParams = {
      if (title != null) 'title': title,
      if (typeId != null) 'typeId': typeId.toString(),
      if (categoryId != null) 'categoryId': categoryId.toString(),
      if (location != null) 'location': location,
      if (minSalary != null) 'minSalary': minSalary.toString(),
      if (maxSalary != null) 'maxSalary': maxSalary.toString(),
      if (positionId != null) 'positionId': positionId.toString(),
      if (skillId != null) 'skillId': skillId.toString(),
    };

    final response = await _api.get('/jobs', queryParams: queryParams);
    return (response as List).map((json) => Job.fromJson(json)).toList();
  }

  Future<Job> getJobById(int jobId) async {
    final response = await _api.get('/jobs/detail/$jobId');
    return Job.fromJson(response);
  }

  Future<List<JobCategory>> getJobCategories() async {
    final response = await _api.get('/job-categories');
    return (response as List).map((json) => JobCategory.fromJson(json)).toList();
  }

  Future<List<JobType>> getJobTypes() async {
    final response = await _api.get('/job-types');
    return (response as List).map((json) => JobType.fromJson(json)).toList();
  }

  Future<List<Job>> getSavedJobs(int userId) async {
    final response = await _api.get('/saved-jobs', queryParams: {'userId': userId});
    return (response as List).map((json) => Job.fromJson(json)).toList();
  }

  Future<void> saveJob(int userId, int jobId) async {
    await _api.post('/saved-jobs', body: {
      'userId': userId,
      'jobId': jobId,
    });
  }

  Future<void> unsaveJob(int userId, int jobId) async {
    await _api.delete('/saved-jobs', queryParams: {
      'userId': userId.toString(),
      'jobId': jobId.toString(),
    });
  }

  Future<List<Job>> getJobsByRecruiter(int userId) async {
    final response = await _api.get('/jobs/recruiter/$userId');
    return (response as List).map((json) => Job.fromJson(json)).toList();
  }

  Future<Job> createJob(int userId, Job job) async {
    final response = await _api.post('/jobs/$userId', job.toJson());
    return Job.fromJson(response);
  }

  Future<List<Job>> getJobsByPostAt(String postAt) async {
    final response = await _api.get('/jobs/postat/$postAt');
    return (response as List).map((json) => Job.fromJson(json)).toList();
  }

  static Future<void> applyJob(int userId, int jobId, int resumeId) async {
    try {
      developer.log('Applying for job $jobId with resume $resumeId for user $userId');
      final api = await _api;
      await api.post('/applications', body: {
        'userId': userId,
        'jobId': jobId,
        'resumeId': resumeId,
      });
      developer.log('Job application submitted successfully');
    } catch (e, stackTrace) {
      developer.log('Error applying for job: $e\n$stackTrace');
      throw Exception('Failed to apply job: $e');
    }
  }
} 