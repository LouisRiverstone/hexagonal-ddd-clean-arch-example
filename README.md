# 🔷 Hexagonal Architecture + DDD + Clean Architecture Example

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License">
</p>

This repository is a study project demonstrating the implementation of a software architecture that combines three powerful architectural approaches. It serves as a practical reference for developers who want to understand how these patterns can be effectively combined.

## 🎯 Purpose

This project aims to illustrate:

- How to structure a TypeScript application using Hexagonal Architecture
- How to implement Domain-Driven Design concepts
- How to apply Clean Architecture principles
- How to maintain separation of concerns and testability

This is purely educational code and is not intended for production use.

## 🏛️ Architectural Overview

This project combines three powerful architectural patterns:

### 🔶 Hexagonal Architecture (Ports & Adapters)

Hexagonal Architecture, proposed by Alistair Cockburn, organizes code to separate the business logic from external concerns by:

- **Core Domain**: Contains all business logic, isolated from external dependencies
- **Ports**: Interfaces that define how the application interacts with the outside world
- **Adapters**: Implementations that connect external technologies to the application through ports

<p align="center">
  <kbd>
    <img src="https://herbertograca.files.wordpress.com/2018/11/100-explicit-architecture-svg.png" width="500" alt="Hexagonal Architecture">
  </kbd>
</p>

Benefits:
- ✅ External systems can be changed without affecting core business logic
- ✅ Application can be driven by users, programs, tests, or batch scripts equally
- ✅ Enables true isolation of business rules from infrastructure concerns

### 🧩 Domain-Driven Design (DDD)

Domain-Driven Design, introduced by Eric Evans, is an approach to software development that:

- Focuses on the core domain logic
- Bases complex designs on a model of the domain
- Involves collaboration between technical and domain experts

Key DDD Concepts implemented:
- **Entities**: Objects with identity (Customer)
- **Value Objects**: Immutable objects without identity (Name, Address)
- **Aggregates**: Clusters of entities and value objects treated as a unit
- **Repositories**: Abstractions for persistence
- **Domain Services**: Stateless operations that don't belong to entities
- **Ubiquitous Language**: Shared language between developers and domain experts

<p align="center">
  <kbd>
    <img src="https://miro.medium.com/v2/resize:fit:1400/1*5AQ3iggJs4x9QlkFvNh3dA.png" width="500" alt="Domain-Driven Design">
  </kbd>
</p>

### 🧅 Clean Architecture

Clean Architecture, proposed by Robert C. Martin (Uncle Bob), emphasizes:

- Independence of frameworks
- Testability independent of UI, database, etc.
- Independence from any external agency

The architectural pattern consists of concentric layers:
- **Entities**: Enterprise business rules
- **Use Cases**: Application-specific business rules
- **Interface Adapters**: Adapters between use cases and external systems
- **Frameworks & Drivers**: External frameworks and tools

<p align="center">
  <kbd>
    <img src="https://miro.medium.com/v2/resize:fit:1400/0*UoLJEi_0q8gXh72l.png" width="500" alt="Clean Architecture">
  </kbd>
</p>

Key principles:
- ✅ **Dependency Rule**: Source code dependencies point only inward
- ✅ **Screaming Architecture**: Architecture should scream the intended use
- ✅ **Clean Boundaries**: Clear boundaries between layers

## 📂 Project Structure

```
src/
├── application/         # Application layer (use cases)
│   └── customer/
│       ├── ports/       # Input ports (interfaces for use cases)
│       │   └── in/      # Input interfaces used by external systems
│       └── use_cases/   # Use case implementations
│
├── domain/              # Domain layer (application core)
│   └── customer/
│       ├── entities/    # Domain entities (Customer)
│       ├── enums/       # Domain enumerations (CustomerStatus)
│       ├── exceptions/  # Domain-specific exceptions
│       ├── repositories/# Output ports (repository interfaces)
│       └── value_objects/# Value objects (Name, Address, ZipCode)
│
├── infrastructure/      # Infrastructure layer (adapters)
│   └── persistence/
│       └── memory/      # In-memory repository implementations
│
└── config/              # Application configurations (DI, etc.)

tests/
├── unit/               # Unit tests
│   ├── domain/         # Domain tests
│   ├── application/    # Application layer tests
│   └── infrastructure/ # Infrastructure tests
│
└── integration/        # Integration tests
```

## 🧩 Project Components

### Domain Layer

The domain layer contains the business logic and rules of the application:

- **Entities**: `Customer` - Core business objects with identity and lifecycle
- **Value Objects**: `Name`, `Address`, `ZipCode` - Immutable objects that describe characteristics
- **Repositories Interfaces**: `CustomerRepositoryPort` - Ports for data persistence
- **Enums**: `CustomerStatus` - Domain-specific enumerations
- **Exceptions**: Domain-specific exceptions for validation and business rules

### Application Layer

The application layer orchestrates the flow of data to and from the domain:

- **Use Cases**: `CreateCustomerService`, `GetCustomersService` - Application-specific business rules
- **Ports**: `CreateCustomerUseCase`, `GetCustomersUseCase` - Interfaces for use cases

### Infrastructure Layer

The infrastructure layer provides implementations to external systems:

- **Repositories**: `CustomerRepositoryMemory` - In-memory implementation of repository interfaces
- **Configuration**: `DependencyInjection` - Wires up the application components

## 📐 Architectural Principles Applied

### Dependency Inversion Principle

- Domain entities don't depend on application services
- Application services don't depend on infrastructure implementations
- Dependencies point inward toward the domain

### Separation of Concerns

- Each layer has a clear and distinct responsibility
- The domain doesn't know about persistence
- The application layer doesn't know about HTTP, CLI, etc.

### Testability

- Every component can be tested in isolation
- The domain can be tested without infrastructure
- Use cases can be tested with mocked repositories

## 💻 How to Run

```bash
# Install dependencies
npm install

# Run the application
npm run dev

# Run tests
npm test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Build the project
npm run build

# Run the compiled version
npm start
```

## 🧪 Testing Strategy

This project uses a comprehensive testing approach:

- **Unit Tests**: Test individual components in isolation
  - Domain entities and value objects
  - Use cases with mocked dependencies
  - Repository implementations

- **Integration Tests**: Test how components work together
  - Flow between use cases and repositories
  - End-to-end business operations

## ⚠️ Limitations

This project is intentionally simple to facilitate understanding of architectural concepts. In a real application, you would need to consider:

- Persistence in a real database
- More robust error handling
- More comprehensive validations
- Authentication and authorization
- Logging and monitoring
- Event-driven communication between bounded contexts
- CQRS (Command Query Responsibility Segregation)
- Event Sourcing
- Performance considerations

## 📚 Further Reading

- [Hexagonal Architecture (Alistair Cockburn)](https://alistair.cockburn.us/hexagonal-architecture/)
- [Domain-Driven Design (Eric Evans)](https://domainlanguage.com/ddd/)
- [Clean Architecture (Robert C. Martin)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## 📄 License

This project is made available as open source under the [MIT](LICENSE) license. 