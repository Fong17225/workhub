class Job {
  final int id;
  final int recruiterId;
  final String recruiterName;
  final int categoryId;
  final String categoryName;
  final int typeId;
  final String typeName;
  final int positionId;
  final String positionName;
  final String title;
  final String description;
  final String? salaryRange;
  final String experience;
  final String? location;
  final DateTime createdAt;
  final DateTime? deadline;
  final String postAt;
  final List<Skill> skills;

  Job({
    required this.id,
    required this.recruiterId,
    required this.recruiterName,
    required this.categoryId,
    required this.categoryName,
    required this.typeId,
    required this.typeName,
    required this.positionId,
    required this.positionName,
    required this.title,
    required this.description,
    this.salaryRange,
    required this.experience,
    this.location,
    required this.createdAt,
    this.deadline,
    required this.postAt,
    required this.skills,
  });

  factory Job.fromJson(Map<String, dynamic> json) {
    return Job(
      id: json['id'],
      recruiterId: json['recruiter']['id'],
      recruiterName: json['recruiter']['name'] ?? '',
      categoryId: json['category']['id'],
      categoryName: json['category']['name'] ?? '',
      typeId: json['type']['id'],
      typeName: json['type']['name'] ?? '',
      positionId: json['position']['id'],
      positionName: json['position']['name'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      salaryRange: json['salaryRange'],
      experience: json['experience'] ?? '',
      location: json['location'],
      createdAt: DateTime.parse(json['createdAt']),
      deadline: json['deadline'] != null ? DateTime.parse(json['deadline']) : null,
      postAt: json['postAt'] ?? 'standard',
      skills: (json['skills'] as List? ?? [])
          .map((skill) => Skill.fromJson(skill))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'recruiter': {
        'id': recruiterId,
        'name': recruiterName,
      },
      'category': {
        'id': categoryId,
        'name': categoryName,
      },
      'type': {
        'id': typeId,
        'name': typeName,
      },
      'position': {
        'id': positionId,
        'name': positionName,
      },
      'title': title,
      'description': description,
      'salaryRange': salaryRange,
      'experience': experience,
      'location': location,
      'createdAt': createdAt.toIso8601String(),
      'deadline': deadline?.toIso8601String(),
      'postAt': postAt,
      'skills': skills.map((skill) => skill.toJson()).toList(),
    };
  }
}

class Skill {
  final int id;
  final String name;
  final String? description;

  Skill({
    required this.id,
    required this.name,
    this.description,
  });

  factory Skill.fromJson(Map<String, dynamic> json) {
    return Skill(
      id: json['id'],
      name: json['name'] ?? '',
      description: json['description'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
    };
  }
} 