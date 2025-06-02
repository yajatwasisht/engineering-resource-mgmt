const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Project = require('./models/Project');
const Assignment = require('./models/Assignment');

dotenv.config();

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear old data
    await User.deleteMany();
    await Project.deleteMany();
    await Assignment.deleteMany();

    // Sample Users
    const engineers = await User.insertMany([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'password123',
        role: 'engineer',
        skills: ['React', 'Node.js'],
        seniority: 'mid',
        maxCapacity: 100,
        department: 'Frontend'
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: 'password123',
        role: 'engineer',
        skills: ['Python', 'Node.js'],
        seniority: 'senior',
        maxCapacity: 50,
        department: 'Backend'
      }
    ]);

    const manager = await User.create({
      name: 'Manager Mike',
      email: 'manager@example.com',
      password: 'password123',
      role: 'manager'
    });

    // Sample Projects
    const projects = await Project.insertMany([
      {
        name: 'Internal Dashboard',
        description: 'Company-wide internal analytics tool',
        startDate: new Date(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        requiredSkills: ['React'],
        teamSize: 2,
        status: 'active',
        managerId: manager._id
      },
      {
        name: 'API Refactor',
        description: 'Refactoring and optimization of backend APIs',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        requiredSkills: ['Node.js', 'Python'],
        teamSize: 3,
        status: 'planning',
        managerId: manager._id
      }
    ]);

    // Sample Assignments
    await Assignment.insertMany([
      {
        engineerId: engineers[0]._id,
        projectId: projects[0]._id,
        allocationPercentage: 60,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        role: 'Developer'
      },
      {
        engineerId: engineers[1]._id,
        projectId: projects[1]._id,
        allocationPercentage: 50,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        role: 'Tech Lead'
      }
    ]);

    console.log('✅ Seed data inserted');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Failed to seed data:', err);
  }
}

seedData();
