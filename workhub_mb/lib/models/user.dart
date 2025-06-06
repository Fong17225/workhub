class User {
  final int id;
  final String email;
  final String fullname;
  final String? avatar;
  final String role;
  final String status;
  final String? phone;
  final String? address;

  User({
    required this.id,
    required this.email,
    required this.fullname,
    this.avatar,
    required this.role,
    required this.status,
    this.phone,
    this.address,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as int,
      email: json['email'] as String,
      fullname: json['fullname'] as String,
      avatar: json['avatar'] as String?,
      role: json['role'] as String,
      status: json['status'] as String,
      phone: json['phone'] as String?,
      address: json['address'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'fullname': fullname,
      'avatar': avatar,
      'role': role,
      'status': status,
      'phone': phone,
      'address': address,
    };
  }
} 