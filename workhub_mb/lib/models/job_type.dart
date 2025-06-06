class JobType {
  final int id;
  final String name;
  final String? description;

  JobType({
    required this.id,
    required this.name,
    this.description,
  });

  factory JobType.fromJson(Map<String, dynamic> json) {
    return JobType(
      id: json['id'] as int,
      name: json['name'] as String,
      description: json['description'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      if (description != null) 'description': description,
    };
  }
} 