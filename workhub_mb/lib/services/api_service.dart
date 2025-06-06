import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class HttpException implements Exception {
  final String message;
  HttpException(this.message);
  @override
  String toString() => message;
}

class ApiService {
  static const String baseUrl = 'http://10.0.2.2:8080/workhub/api/v1';
  static const Duration timeout = Duration(seconds: 10);
  static ApiService? _instance;
  SharedPreferences? _prefs;

  ApiService._();

  static Future<ApiService> getInstance() async {
    if (_instance == null) {
      _instance = ApiService._();
      try {
        await _instance!._initPrefs();
      } catch (e) {
        print('Warning: Could not initialize SharedPreferences: $e');
        // Tiếp tục mà không có SharedPreferences
      }
    }
    return _instance!;
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
      'Accept': 'application/json',
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
      final headers = await _getHeaders();
      
      print('Making GET request to: ${uri.toString()}');
      final response = await http.get(uri, headers: headers)
          .timeout(timeout);
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return json.decode(response.body);
      } else {
        throw HttpException('Request failed with status: ${response.statusCode}');
      }
    } catch (e) {
      print('Error in GET request: $e');
      throw HttpException('Network error: $e');
    }
  }

  Future<dynamic> post(String endpoint, {Map<String, dynamic>? body}) async {
    try {
      final uri = Uri.parse('$baseUrl$endpoint');
      final headers = await _getHeaders();
      
      print('Making POST request to: ${uri.toString()}');
      print('Request body: ${json.encode(body)}');
      
      final response = await http.post(
        uri,
        headers: headers,
        body: json.encode(body),
      ).timeout(timeout);
      
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return json.decode(response.body);
      } else {
        throw HttpException('Request failed with status: ${response.statusCode}');
      }
    } catch (e) {
      print('Error in POST request: $e');
      throw HttpException('Network error: $e');
    }
  }

  Future<dynamic> put(String endpoint, {Map<String, dynamic>? body}) async {
    try {
      final uri = Uri.parse('$baseUrl$endpoint');
      final headers = await _getHeaders();
      
      print('Making PUT request to: ${uri.toString()}');
      print('Request body: ${json.encode(body)}');
      
      final response = await http.put(
        uri,
        headers: headers,
        body: json.encode(body),
      ).timeout(timeout);
      
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return json.decode(response.body);
      } else {
        throw HttpException('Request failed with status: ${response.statusCode}');
      }
    } catch (e) {
      print('Error in PUT request: $e');
      throw HttpException('Network error: $e');
    }
  }

  Future<dynamic> delete(String endpoint) async {
    try {
      final uri = Uri.parse('$baseUrl$endpoint');
      final headers = await _getHeaders();
      
      print('Making DELETE request to: ${uri.toString()}');
      
      final response = await http.delete(uri, headers: headers)
          .timeout(timeout);
      
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return json.decode(response.body);
      } else {
        throw HttpException('Request failed with status: ${response.statusCode}');
      }
    } catch (e) {
      print('Error in DELETE request: $e');
      throw HttpException('Network error: $e');
    }
  }
} 