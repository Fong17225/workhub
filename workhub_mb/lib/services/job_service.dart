import 'package:workhub_mb/models/job.dart';
import 'package:workhub_mb/services/api_service.dart';
import 'dart:developer' as developer;

class JobService {
  static ApiService? _api;

  static Future<ApiService> _getApi() async {
    _api ??= await ApiService.getInstance();
    return _api!;
  }

  static Future<List<Job>> getJobs({Map<String, dynamic>? queryParams}) async {
    try {
      developer.log('Fetching jobs with params: $queryParams');
      final api = await _getApi();
      final data = await api.get('/jobs', queryParams: queryParams);
      developer.log('Received data: $data');
      
      if (data == null) {
        developer.log('No data received from API');
        return [];
      }

      if (data is! List) {
        developer.log('Invalid data format: $data');
        throw Exception('Invalid data format received from API');
      }

      return data.map((json) => Job.fromJson(json)).toList();
    } catch (e, stackTrace) {
      developer.log('Error fetching jobs: $e\n$stackTrace');
      throw Exception('Failed to load jobs: $e');
    }
  }

  static Future<Job> getJobById(int id) async {
    try {
      developer.log('Fetching job details for ID: $id');
      final api = await _getApi();
      final data = await api.get('/jobs/detail/$id');
      developer.log('Received job data: $data');
      
      if (data == null) {
        developer.log('No data received for job ID: $id');
        throw Exception('Job not found');
      }

      return Job.fromJson(data);
    } catch (e, stackTrace) {
      developer.log('Error fetching job details: $e\n$stackTrace');
      throw Exception('Failed to load job details: $e');
    }
  }

  static Future<List<Job>> getSavedJobs(int userId) async {
    try {
      developer.log('Fetching saved jobs for user: $userId');
      final api = await _getApi();
      final data = await api.get('/saved-jobs', queryParams: {'userId': userId});
      developer.log('Received saved jobs data: $data');
      
      if (data == null) {
        developer.log('No saved jobs data received');
        return [];
      }

      if (data is! List) {
        developer.log('Invalid saved jobs data format: $data');
        throw Exception('Invalid data format received from API');
      }

      return data.map((json) => Job.fromJson(json)).toList();
    } catch (e, stackTrace) {
      developer.log('Error fetching saved jobs: $e\n$stackTrace');
      throw Exception('Failed to load saved jobs: $e');
    }
  }

  static Future<void> saveJob(int userId, int jobId) async {
    try {
      developer.log('Saving job $jobId for user $userId');
      final api = await _getApi();
      await api.post('/saved-jobs', body: {
        'userId': userId,
        'jobId': jobId,
      });
      developer.log('Job saved successfully');
    } catch (e, stackTrace) {
      developer.log('Error saving job: $e\n$stackTrace');
      throw Exception('Failed to save job: $e');
    }
  }

  static Future<void> unsaveJob(int userId, int jobId) async {
    try {
      developer.log('Unsaving job $jobId for user $userId');
      final api = await _getApi();
      await api.delete('/saved-jobs?userId=$userId&jobId=$jobId');
      developer.log('Job unsaved successfully');
    } catch (e, stackTrace) {
      developer.log('Error unsaving job: $e\n$stackTrace');
      throw Exception('Failed to unsave job: $e');
    }
  }

  static Future<void> applyJob(int userId, int jobId, int resumeId) async {
    try {
      developer.log('Applying for job $jobId with resume $resumeId for user $userId');
      final api = await _getApi();
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