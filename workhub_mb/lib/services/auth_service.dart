import 'dart:convert';
import 'package:shared_preferences.dart';
import 'package:workhub_mb/models/user.dart';
import 'package:workhub_mb/services/api_service.dart';

class AuthService {
  static final AuthService _instance = AuthService._internal();
  factory AuthService() => _instance;
  AuthService._internal();

  final ApiService _api = ApiService.getInstance();
  static const String _tokenKey = 'auth_token';
  static const String _userKey = 'user_data';

  Future<User> login(String email, String password) async {
    try {
      final response = await _api.post(
        '/auth/login',
        body: {
          'email': email,
          'password': password,
        },
      );

      final token = response['token'];
      final userData = response['user'];

      // Lưu token và thông tin user
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_tokenKey, token);
      await prefs.setString(_userKey, jsonEncode(userData));

      return User.fromJson(userData);
    } catch (e) {
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