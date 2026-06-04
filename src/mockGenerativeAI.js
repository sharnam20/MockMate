// src/mockGenerativeAI.js

export class GoogleGenerativeAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  getGenerativeModel({ model }) {
    return {
      generateContent: async (prompt) => {
        let textResponse = "";
        const promptLower = prompt.toLowerCase();

        if (promptLower.includes("careerpath") || promptLower.includes("career path")) {
          // CareerRoadmapGenerator
          textResponse = JSON.stringify({
            careerPath: [
              {
                step: 1,
                title: "Build Fundamental Skills",
                description: "Master clean code practices, algorithmic structures, and foundational paradigms for your tech stack. Start building portfolio projects.",
                duration: "3-6 months"
              },
              {
                step: 2,
                title: "Design Systems & Architecture",
                description: "Deep dive into distributed architectures, state models, caching patterns, and cloud security design. Lead small feature development.",
                duration: "6-12 months"
              },
              {
                step: 3,
                title: "Scale, Optimize & Lead",
                description: "Focus on optimization, continuous profiling, container orchestration, and team mentorship. Take full architectural ownership.",
                duration: "1-2 years"
              }
            ]
          });
        } 
        else if (promptLower.includes("interview questions") || promptLower.includes("qapairs") || promptLower.includes("interview q&a")) {
          // InterviewQAGenerator / InterviewFormPage
          // Check if it's InterviewFormPage (which expects questions to be generated)
          if (promptLower.includes("give me only questions") || promptLower.includes("separated by newlines") || promptLower.includes("generate 5 interview questions")) {
            textResponse = JSON.stringify([
              {
                question: "Tell me about a time you solved a complex system-wide bug.",
                answer: "I isolated the issue by analyzing transaction logs, identified a race condition in the database query pipeline, and resolved it using a localized mutex."
              },
              {
                question: "How do you design systems for high availability and low latency?",
                answer: "By utilizing load balancing, horizontal scaling, database indexing/caching with Redis, and a geographically distributed CDN."
              },
              {
                question: "Explain how you manage dependencies and keep builds clean.",
                answer: "By keeping dependency lists lean, pinning exact semantic versions, auditing regularly for vulnerabilities, and using CI/CD tools."
              },
              {
                question: "How do you approach database performance tuning?",
                answer: "By profiling slow queries, analyzing execution plans, applying composite indexes where appropriate, and normalizing/denormalizing based on write-to-read ratios."
              },
              {
                question: "Describe your approach to code reviews.",
                answer: "I check for architecture alignment, security vulnerabilities, edge cases, readability, and performance issues while maintaining positive and constructive communication."
              }
            ]);
          } else {
            textResponse = JSON.stringify([
              {
                "question": "What is the event loop in JavaScript and how does it work?",
                "answer": "The event loop is a mechanism that allows JavaScript to perform non-blocking I/O operations by offloading tasks to the system kernel. It continuously checks the call stack and message queue to execute pending tasks."
              },
              {
                "question": "How do you optimize render performance in a React application?",
                "answer": "You can optimize React render performance by using React.memo for components, useMemo and useCallback to cache values and references, virtualization for long lists, and lazy-loading components."
              },
              {
                "question": "What is the difference between SQL and NoSQL databases?",
                "answer": "SQL databases are relational, table-based, and have strict schemas (e.g. PostgreSQL). NoSQL databases are non-relational, document/key-value/graph-based, and have dynamic schemas (e.g. MongoDB)."
              }
            ]);
          }
        }
        else if (promptLower.includes("company")) {
          // CompanyOverview
          textResponse = JSON.stringify([
            {
              "section": "Overview",
              "content": "A high-growth global technology company known for engineering excellence, scalable SaaS solutions, and a strong product-focused business model."
            },
            {
              "section": "Culture",
              "content": "Collaborative, remote-first, and highly autonomous. Engineering squads own features from design to deploy with high emphasis on automated testing and continuous integration."
            },
            {
              "section": "Latest News",
              "content": "Recently launched major AI updates, expanded cloud integrations, and announced positive record revenue numbers during the latest corporate earnings call."
            },
            {
              "section": "Key Facts",
              "content": "- **Founded**: 2012\n- **Headquarters**: San Francisco, CA / Distributed\n- **Primary Tech**: Node.js, React, Python, AWS"
            },
            {
              "section": "Customer Reviews",
              "content": "Highly positive reviews (4.6/5 stars) praising product reliability, customer support responsiveness, and regular updates."
            },
            {
              "section": "Financials",
              "content": "Showing stable 35% Year-over-Year revenue growth, strong free cash flow, and a solid paths-to-profitability trajectory."
            },
            {
              "section": "Competitors",
              "content": "Mainly other enterprise cloud platforms, developer tool suites, and scalable SaaS solutions in the tech productivity space."
            }
          ]);
        }
        else if (promptLower.includes("cover letter")) {
          // CoverLetterGenerator
          textResponse = `Dear Hiring Manager,

I am writing to express my enthusiastic interest in the Software Engineer position. With my background in building high-performance web applications and working with modern React and Node.js codebases, I am confident that I can contribute immediately to your product development goals.

In my previous projects, I successfully implemented responsive designs, optimized system state rendering, and integrated third-party APIs. I enjoy solving complex architectural challenges and collaborating with cross-functional teams to build clean, maintainable systems.

Thank you for your time and consideration. I look forward to discussing how my skills and experience can support your engineering achievements.

Sincerely,
[Your Name]`;
        }
        else if (promptLower.includes("resume") || promptLower.includes("score")) {
          // ResumeAnalyzer
          textResponse = JSON.stringify([
            {
              "resumeScore": 88,
              "atsCompatibility": 82,
              "improvements": [
                "Include concrete metrics to quantify your impact (e.g., 'reduced bundle size by 30%').",
                "Add details about deployment, CI/CD pipelines, and cloud services (AWS/GCP/Vercel)."
              ],
              "suggestions": [
                "Consider formatting skills into categorizations (Frontend, Backend, Tools) for better readability.",
                "Ensure professional links like LinkedIn or GitHub are placed at the header."
              ],
              "weaknesses": [
                "Limited visibility of testing methodologies (unit tests, integration tests).",
                "Education description lacks coursework highlights."
              ],
              "strengths": [
                "Excellent usage of modern tech stack keywords (React, JavaScript, Firebase, Git).",
                "Strong project portfolio highlighting real-world applications."
              ],
              "recommendedRoles": [
                "Frontend Engineer",
                "Fullstack Developer",
                "Software Engineer"
              ]
            }
          ]);
        }
        else if (promptLower.includes("recruiter") || promptLower.includes("interview transcript") || promptLower.includes("strengths")) {
          // AIInterviewPage (generateFeedback)
          textResponse = JSON.stringify({
            strengths: "Demonstrated strong knowledge of core web architectural principles, clear explanations of event handling, and logical problem-solving strategies.",
            improvements: "Could focus on structuring the answers using the STAR method (Situation, Task, Action, Result) and keep explanations slightly more concise.",
            communicationClarityScore: 9,
            relevanceScore: 8,
            overallScore: 8,
            detailedFeedback: "Excellent mock interview performance! The candidate explained React lifecycle hooks, state lift-up, and rendering optimizations clearly. Focusing slightly more on system scalability and practical debugging metrics will make the performance stellar."
          });
        }
        else {
          // Chatbot fallback / General prompt
          textResponse = "Hello! I am MockMate's AI assistant running in offline mode. I can answer questions about system design, coding paradigms, resume tips, and interview processes. What would you like to discuss today?";
        }

        return {
          response: {
            text: async () => textResponse
          }
        };
      }
    };
  }
}
