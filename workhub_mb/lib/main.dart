import 'package:flutter/material.dart';
import 'package:workhub_mb/screens/home_screen.dart';
import 'package:workhub_mb/screens/jobs_screen.dart';
import 'package:workhub_mb/screens/job_details_screen.dart';
import 'package:workhub_mb/screens/login_screen.dart';
import 'package:workhub_mb/screens/profile_screen.dart';
import 'package:workhub_mb/services/auth_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await AuthService().init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'WorkHub App',
      theme: ThemeData(
        primaryColor: const Color(0xFF2563EB), // Primary color
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2563EB),
          secondary: const Color(0xFF64748B), // Secondary color
          tertiary: const Color(0xFFF59E0B), // Accent color
        ),
        scaffoldBackgroundColor: const Color(0xFFF9FAFB), // Background color
        cardColor: Colors.white,
        textTheme: const TextTheme(
          bodyLarge: TextStyle(color: Color(0xFF1F2937)), // Text color
          bodyMedium: TextStyle(color: Color(0xFF4B5563)), // Secondary text color
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF2563EB),
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ),
        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            foregroundColor: const Color(0xFF2563EB),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.white,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Color(0xFF2563EB), width: 2),
          ),
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        ),
      ),
      home: FutureBuilder<bool>(
        future: AuthService().isLoggedIn(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Scaffold(
              body: Center(
                child: CircularProgressIndicator(),
              ),
            );
          }

          if (snapshot.data == true) {
            return const HomeScreen();
          }

          return const LoginScreen();
        },
      ),
      routes: {
        '/home': (context) => const HomeScreen(),
        '/jobs': (context) => const JobsScreen(),
        '/login': (context) => const LoginScreen(),
        '/profile': (context) => const ProfileScreen(),
        // Route for job details screen with dynamic ID
        '/jobs/details': (context) {
           final args = ModalRoute.of(context)?.settings.arguments as int?;
           if (args != null) {
             return JobDetailsScreen(jobId: args);
           }
           // Handle case where jobId is not provided (e.g., navigate to jobs list)
           return const JobsScreen(); // Or show an error screen
        },
      },
    );
  }
}
