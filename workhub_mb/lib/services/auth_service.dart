import 'dart:convert';
import 'dart:developer' as developer;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:workhub_mb/models/user.dart';
import 'package:workhub_mb/services/api_service.dart';

class AuthService {
  static final AuthService _instance = AuthService._internal();
  factory AuthService() => _instance;
  AuthService._internal();

  late final ApiService _api;
  static const String _tokenKey = 'auth_token';
  static const String _userKey = 'user_data';

  Future<void> init() async {
    _api = ApiService();
  }

  Future<User> login(String email, String password) async {
    try {
      developer.log('Đang gửi request đăng nhập...');
      final response = await _api.post(
        '/login?email=$email&password=$password',
        body: {},
      );
      developer.log('Response từ server: $response');
      developer.log('Response type: ${response.runtimeType}');

      if (response is String) {
        throw Exception(response);
      }

      // Log chi tiết từng field
      developer.log('Response fields:');
      response.forEach((key, value) {
        developer.log('$key: $value (${value?.runtimeType})');
      });

      // Lưu thông tin user
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_userKey, jsonEncode(response));

      return User.fromJson(response as Map<String, dynamic>);
    } catch (e) {
      developer.log('Lỗi đăng nhập: $e', error: e);
      throw Exception('Đăng nhập thất bại: ${e.toString()}');
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
    await prefs.remove(_userKey);
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }

  Future<User?> getCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userData = prefs.getString(_userKey);
    if (userData != null) {
      return User.fromJson(jsonDecode(userData));
    }
    return null;
  }

  Future<bool> isLoggedIn() async {
    final token = await getToken();
    return token != null;
  }
} 