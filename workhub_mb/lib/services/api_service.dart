import 'dart:convert';
import 'dart:developer' as developer;
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class HttpException implements Exception {
  final String message;
  HttpException(this.message);
  @override
  String toString() => message;
}

class ApiService {
  late final String baseUrl;
  late final http.Client _client;
  String? _token;
  SharedPreferences? _prefs;

  ApiService._() {
    _client = http.Client();
    // Sử dụng IP của máy tính
    baseUrl = 'http://192.168.12.171:8080/workhub/api/v1';
    developer.log('API Service initialized with baseUrl: $baseUrl');
  }

  static final ApiService _instance = ApiService._();

  factory ApiService() {
    return _instance;
  }

  Future<void> _initPrefs() async {
    try {
      _prefs = await SharedPreferences.getInstance();
    } catch (e) {
      print('Warning: Could not initialize SharedPreferences: $e');
      // Tiếp tục mà không có SharedPreferences
    }
  }

  Future<Map<String, String>> _getHeaders() async {
    final headers = {
      'Content-Type': 'application/json',
    };

    try {
      if (_prefs != null) {
        final token = _prefs!.getString('token');
        if (token != null) {
          headers['Authorization'] = 'Bearer $token';
        }
      }
    } catch (e) {
      print('Warning: Could not get token: $e');
    }

    return headers;
  }

  Future<dynamic> get(String endpoint, {Map<String, dynamic>? queryParams}) async {
    try {
      final uri = Uri.parse('$baseUrl$endpoint').replace(queryParameters: queryParams);
      developer.log('GET Request to: $uri');
      developer.log('Headers: ${await _getHeaders()}');
      
      final response = await _client.get(
        uri,
        headers: await _getHeaders(),
      ).timeout(const Duration(seconds: 30));
      
      developer.log('Response status: ${response.statusCode}');
      developer.log('Response body: ${response.body}');
      
      return _handleResponse(response);
    } catch (e) {
      developer.log('GET Error: $e');
      throw Exception('Network error: $e');
    }
  }

  Future<dynamic> post(String endpoint, {required Map<String, dynamic> body}) async {
    try {
      final uri = Uri.parse('$baseUrl$endpoint');
      developer.log('POST Request to: $uri');
      developer.log('Headers: ${await _getHeaders()}');
      developer.log('Body: $body');
      
      final response = await _client.post(
        uri,
        headers: await _getHeaders(),
        body: jsonEncode(body),
      ).timeout(const Duration(seconds: 30));
      
      developer.log('Response status: ${response.statusCode}');
      developer.log('Response body: ${response.body}');
      
      return _handleResponse(response);
    } catch (e) {
      developer.log('POST Error: $e');
      throw Exception('Network error: $e');
    }
  }

  Future<dynamic> put(String endpoint, {required Map<String, dynamic> body}) async {
    try {
      developer.log('PUT $baseUrl$endpoint');
      developer.log('Request body: $body');
      
      final response = await http.put(
        Uri.parse('$baseUrl$endpoint'),
        headers: await _getHeaders(),
        body: jsonEncode(body),
      ).timeout(const Duration(seconds: 30));

      developer.log('Response status: ${response.statusCode}');
      developer.log('Response body: ${response.body}');

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Failed to update data: ${response.statusCode}');
      }
    } catch (e) {
      developer.log('Network error: $e', error: e);
      throw Exception('Network error: $e');
    }
  }

  Future<void> delete(String endpoint) async {
    try {
      developer.log('DELETE $baseUrl$endpoint');
      
      final response = await http.delete(
        Uri.parse('$baseUrl$endpoint'),
        headers: await _getHeaders(),
      ).timeout(const Duration(seconds: 30));

      developer.log('Response status: ${response.statusCode}');
      developer.log('Response body: ${response.body}');

      if (response.statusCode != 200 && response.statusCode != 204) {
        throw Exception('Failed to delete data: ${response.statusCode}');
      }
    } catch (e) {
      developer.log('Network error: $e', error: e);
      throw Exception('Network error: $e');
    }
  }

  dynamic _handleResponse(http.Response response) {
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load data: ${response.statusCode}');
    }
  }
} 