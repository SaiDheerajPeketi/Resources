import type { TechnologySpec } from "@/data/technology-factory";

type Row = [id: string, title: string, ecosystem: TechnologySpec["ecosystem"], kind: TechnologySpec["kind"], packageName: string, docs: string, repository: string];

const rows: Row[] = [
  ["react", "React", "javascript", "framework", "react", "https://react.dev/", "https://github.com/facebook/react"],
  ["nextjs", "Next.js", "javascript", "framework", "next", "https://nextjs.org/docs", "https://github.com/vercel/next.js"],
  ["angular", "Angular", "javascript", "framework", "@angular/cli", "https://angular.dev/", "https://github.com/angular/angular"],
  ["vue", "Vue", "javascript", "framework", "vue", "https://vuejs.org/guide/", "https://github.com/vuejs/core"],
  ["nuxt", "Nuxt", "javascript", "framework", "nuxt", "https://nuxt.com/docs", "https://github.com/nuxt/nuxt"],
  ["svelte", "Svelte", "javascript", "framework", "svelte", "https://svelte.dev/docs/svelte/overview", "https://github.com/sveltejs/svelte"],
  ["sveltekit", "SvelteKit", "javascript", "framework", "@sveltejs/kit", "https://svelte.dev/docs/kit/introduction", "https://github.com/sveltejs/kit"],
  ["redux-toolkit", "Redux Toolkit", "javascript", "framework", "@reduxjs/toolkit", "https://redux-toolkit.js.org/", "https://github.com/reduxjs/redux-toolkit"],
  ["tanstack-query", "TanStack Query", "javascript", "framework", "@tanstack/react-query", "https://tanstack.com/query/latest/docs/framework/react/overview", "https://github.com/TanStack/query"],
  ["tailwind-css", "Tailwind CSS", "web", "framework", "tailwindcss", "https://tailwindcss.com/docs", "https://github.com/tailwindlabs/tailwindcss"],
  ["nodejs", "Node.js", "javascript", "runtime", "node", "https://nodejs.org/docs/latest/api/", "https://github.com/nodejs/node"],
  ["express", "Express", "javascript", "framework", "express", "https://expressjs.com/", "https://github.com/expressjs/express"],
  ["nestjs", "NestJS", "javascript", "framework", "@nestjs/core", "https://docs.nestjs.com/", "https://github.com/nestjs/nest"],
  ["spring", "Spring Framework", "java", "framework", "org.springframework:spring-context", "https://docs.spring.io/spring-framework/reference/", "https://github.com/spring-projects/spring-framework"],
  ["spring-boot", "Spring Boot", "java", "framework", "org.springframework.boot:spring-boot", "https://docs.spring.io/spring-boot/reference/", "https://github.com/spring-projects/spring-boot"],
  ["hibernate", "Hibernate ORM", "java", "framework", "org.hibernate.orm:hibernate-core", "https://hibernate.org/orm/documentation/", "https://github.com/hibernate/hibernate-orm"],
  ["django", "Django", "python", "framework", "django", "https://docs.djangoproject.com/", "https://github.com/django/django"],
  ["django-rest-framework", "Django REST Framework", "python", "framework", "djangorestframework", "https://www.django-rest-framework.org/", "https://github.com/encode/django-rest-framework"],
  ["flask", "Flask", "python", "framework", "flask", "https://flask.palletsprojects.com/", "https://github.com/pallets/flask"],
  ["fastapi", "FastAPI", "python", "framework", "fastapi", "https://fastapi.tiangolo.com/", "https://github.com/fastapi/fastapi"],
  ["aspnet-core", "ASP.NET Core", "dotnet", "framework", "Microsoft.AspNetCore.App", "https://learn.microsoft.com/aspnet/core/", "https://github.com/dotnet/aspnetcore"],
  ["entity-framework-core", "Entity Framework Core", "dotnet", "framework", "Microsoft.EntityFrameworkCore", "https://learn.microsoft.com/ef/core/", "https://github.com/dotnet/efcore"],
  ["go-http", "Go net/http", "go", "framework", "net/http", "https://pkg.go.dev/net/http", "https://github.com/golang/go"],
  ["gin", "Gin", "go", "framework", "github.com/gin-gonic/gin", "https://gin-gonic.com/docs/", "https://github.com/gin-gonic/gin"],
  ["tokio", "Tokio", "rust", "runtime", "tokio", "https://tokio.rs/tokio/tutorial", "https://github.com/tokio-rs/tokio"],
  ["axum", "Axum", "rust", "framework", "axum", "https://docs.rs/axum/latest/axum/", "https://github.com/tokio-rs/axum"],
  ["ktor", "Ktor", "java", "framework", "io.ktor:ktor-server-core", "https://ktor.io/docs/", "https://github.com/ktorio/ktor"],
  ["laravel", "Laravel", "web", "framework", "laravel/framework", "https://laravel.com/docs", "https://github.com/laravel/framework"],
  ["rails", "Ruby on Rails", "web", "framework", "rails", "https://guides.rubyonrails.org/", "https://github.com/rails/rails"],
  ["akka", "Akka", "java", "framework", "com.typesafe.akka:akka-actor-typed", "https://doc.akka.io/", "https://github.com/akka/akka"],
  ["play-framework", "Play Framework", "java", "framework", "org.playframework:play", "https://www.playframework.com/documentation/latest/Home", "https://github.com/playframework/playframework"],
  ["postgresql", "PostgreSQL", "database", "database", "postgres", "https://www.postgresql.org/docs/", "https://github.com/postgres/postgres"],
  ["mysql", "MySQL", "database", "database", "mysql", "https://dev.mysql.com/doc/", "https://github.com/mysql/mysql-server"],
  ["sqlite", "SQLite", "database", "database", "sqlite", "https://www.sqlite.org/docs.html", "https://github.com/sqlite/sqlite"],
  ["sql-server", "SQL Server", "database", "database", "mcr.microsoft.com/mssql/server", "https://learn.microsoft.com/sql/", "https://github.com/microsoft/mssql-docker"],
  ["mongodb", "MongoDB", "database", "database", "mongo", "https://www.mongodb.com/docs/", "https://github.com/mongodb/mongo"],
  ["redis", "Redis", "database", "database", "redis", "https://redis.io/docs/latest/", "https://github.com/redis/redis"],
  ["elasticsearch-opensearch", "Elasticsearch and OpenSearch", "database", "database", "opensearchproject/opensearch", "https://opensearch.org/docs/latest/", "https://github.com/opensearch-project/OpenSearch"],
  ["cassandra", "Apache Cassandra", "database", "database", "cassandra", "https://cassandra.apache.org/doc/latest/", "https://github.com/apache/cassandra"],
  ["dynamodb", "Amazon DynamoDB", "database", "database", "amazon/dynamodb-local", "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/", "https://github.com/aws-samples/aws-dynamodb-examples"],
  ["neo4j", "Neo4j", "database", "database", "neo4j", "https://neo4j.com/docs/", "https://github.com/neo4j/neo4j"],
  ["junit-mockito", "JUnit and Mockito", "java", "tool", "org.junit.jupiter:junit-jupiter", "https://junit.org/junit5/docs/current/user-guide/", "https://github.com/junit-team/junit5"],
  ["pytest", "pytest", "python", "tool", "pytest", "https://docs.pytest.org/", "https://github.com/pytest-dev/pytest"],
  ["jest-vitest", "Jest and Vitest", "javascript", "tool", "vitest", "https://vitest.dev/guide/", "https://github.com/vitest-dev/vitest"],
  ["playwright", "Playwright", "javascript", "tool", "@playwright/test", "https://playwright.dev/docs/intro", "https://github.com/microsoft/playwright"],
  ["cypress", "Cypress", "javascript", "tool", "cypress", "https://docs.cypress.io/", "https://github.com/cypress-io/cypress"],
  ["selenium", "Selenium", "web", "tool", "selenium", "https://www.selenium.dev/documentation/", "https://github.com/SeleniumHQ/selenium"],
  ["maven", "Maven", "java", "tool", "org.apache.maven:maven-core", "https://maven.apache.org/guides/", "https://github.com/apache/maven"],
  ["gradle", "Gradle", "java", "tool", "gradle", "https://docs.gradle.org/current/userguide/userguide.html", "https://github.com/gradle/gradle"],
  ["npm-pnpm", "npm and pnpm", "javascript", "tool", "pnpm", "https://pnpm.io/", "https://github.com/pnpm/pnpm"],
  ["uv-poetry", "uv and Poetry", "python", "tool", "uv", "https://docs.astral.sh/uv/", "https://github.com/astral-sh/uv"],
  ["cargo", "Cargo", "rust", "tool", "cargo", "https://doc.rust-lang.org/cargo/", "https://github.com/rust-lang/cargo"],
  ["go-modules", "Go Modules", "go", "tool", "go", "https://go.dev/ref/mod", "https://github.com/golang/go"],
  ["nuget", "NuGet", "dotnet", "tool", "NuGet.CommandLine", "https://learn.microsoft.com/nuget/", "https://github.com/NuGet/Home"]
];

function registry(ecosystem: TechnologySpec["ecosystem"], packageName: string) {
  if (ecosystem === "javascript" || ecosystem === "web") return `https://www.npmjs.com/package/${encodeURIComponent(packageName)}`;
  if (ecosystem === "python") return `https://pypi.org/project/${packageName}/`;
  if (ecosystem === "rust") return `https://crates.io/crates/${packageName}`;
  if (ecosystem === "go") return packageName.includes("/") ? `https://pkg.go.dev/${packageName}` : "https://pkg.go.dev/std";
  if (ecosystem === "dotnet") return `https://www.nuget.org/packages/${packageName}`;
  if (ecosystem === "java") return "https://central.sonatype.com/";
  return "https://www.docker.com/official-images/";
}

function commands(ecosystem: TechnologySpec["ecosystem"], kind: TechnologySpec["kind"], packageName: string): Array<[string, string, string]> {
  if (kind === "database") return [["Inspect image", `docker image inspect ${packageName}:latest`, "Review image metadata before running it."], ["Pull image", `docker pull ${packageName}:latest`, "Download the selected local lab image."], ["List database containers", "docker ps --filter label=interview-atlas", "Find running lab instances."], ["Read container logs", "docker logs <container>", "Inspect startup and runtime diagnostics."]];
  if (ecosystem === "javascript" || ecosystem === "web") return [["Inspect package", `npm view ${packageName} version`, "Read the registry's current package version."], ["Install", `npm install ${packageName}`, "Add the package and update the lockfile."], ["Run development mode", "npm run dev", "Start the project's development workflow."], ["Test", "npm test", "Execute configured tests."], ["Build", "npm run build", "Create production artifacts."], ["Audit", "npm audit", "Check the resolved dependency graph against advisories."]];
  if (ecosystem === "python") return [["Inspect package", `python -m pip index versions ${packageName}`, "List available versions."], ["Install", `python -m pip install ${packageName}`, "Install into the active environment."], ["Show installation", `python -m pip show ${packageName}`, "Inspect installed metadata."], ["Test", "python -m pytest", "Execute tests."], ["Compile-check", "python -m compileall .", "Check source syntax."], ["Freeze environment", "python -m pip freeze", "Record resolved dependencies."]];
  if (ecosystem === "java") return [["Run Maven tests", "./mvnw test", "Execute the Maven test lifecycle."], ["Run Gradle tests", "./gradlew test", "Execute the Gradle test task."], ["Inspect Maven dependencies", "./mvnw dependency:tree", "Review dependency selection."], ["Inspect Gradle dependencies", "./gradlew dependencies", "Review Gradle configurations."], ["Package", "./mvnw package", "Compile, test, and package."], ["Run JVM diagnostics", "jcmd <pid> VM.info", "Inspect the active JVM."]];
  if (ecosystem === "dotnet") return [["Inspect package", `dotnet package search ${packageName}`, "Search package metadata."], ["Add package", `dotnet add package ${packageName}`, "Update the project package reference."], ["Restore", "dotnet restore", "Resolve packages."], ["Build", "dotnet build", "Compile the solution."], ["Test", "dotnet test", "Run test projects."], ["List packages", "dotnet list package", "Inspect resolved references."]];
  if (ecosystem === "rust") return [["Inspect crate", `cargo search ${packageName}`, "Search registry metadata."], ["Add crate", `cargo add ${packageName}`, "Update Cargo.toml and the lockfile."], ["Check", "cargo check", "Type-check quickly."], ["Test", "cargo test", "Run tests."], ["Lint", "cargo clippy --all-targets", "Run Rust-aware lints."], ["Build release", "cargo build --release", "Compile optimized artifacts."]];
  return [["Add module", `go get ${packageName}`, "Add or update a module dependency."], ["Test", "go test ./...", "Test every package."], ["Race test", "go test -race ./...", "Instrument shared-memory races."], ["Vet", "go vet ./...", "Run Go static checks."], ["Format", "gofmt -w .", "Apply canonical formatting."], ["Inspect modules", "go mod graph", "Review selected dependencies."]];
}

export const release10Specs: TechnologySpec[] = rows.map(([id, title, ecosystem, kind, packageName, docs, repository]) => ({
  id, title, ecosystem, kind,
  summary: `${title} architecture, setup, lifecycle, testing, debugging, performance, security, deployment, and interview trade-offs.`,
  mentalModel: `${title} is best understood as a set of boundaries, lifecycle rules, and failure modes—not a list of APIs. Trace one request or unit of work through those boundaries.`,
  roles: ["frontend", "backend", "full-stack", "sde", "platform"],
  prerequisites: [],
  commands: commands(ecosystem, kind, packageName),
  sources: [[`${title} official documentation`, docs], [`${title} source repository`, repository], [`${title} package or distribution record`, registry(ecosystem, packageName)]],
  code: [title, `// ${title}: isolate the framework boundary behind a small application-facing interface.`, "A thin boundary keeps domain behavior testable and makes lifecycle and failure behavior visible."]
}));
