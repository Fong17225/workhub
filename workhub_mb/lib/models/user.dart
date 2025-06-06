class User {
  final int id;
  final String email;
  final String fullName;
  final String? avatar;
  final String role;
  final String? phone;
  final String? address;

  User({
    required this.id,
    required this.email,
    required this.fullName,
    this.avatar,
    required this.role,
    this.phone,
    this.address,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      email: json['email'],
      fullName: json['fullName'],
      avatar: json['avatar'],
      role: json['role'],
      phone: json['phone'],
      address: json['address'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'fullName': fullName,
      'avatar': avatar,
      'role': role,
      'phone': phone,
      'address': address,
    };
  }
} 