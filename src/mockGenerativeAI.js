// src/mockGenerativeAI.js
import { GoogleGenerativeAI as RealGoogleGenerativeAI } from "../node_modules/@google/generative-ai/dist/index.mjs";

export class GoogleGenerativeAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.isDummy = !apiKey || apiKey === "AIzaSyDummyGeminiKeyHere" || apiKey.toLowerCase().includes("dummy");
    if (!this.isDummy) {
      try {
        this.realGenAI = new RealGoogleGenerativeAI(apiKey);
      } catch (err) {
        console.error("Failed to initialize real GoogleGenerativeAI:", err);
        this.isDummy = true;
      }
    }
  }

  getGenerativeModel(options) {
    if (!this.isDummy && this.realGenAI) {
      return this.realGenAI.getGenerativeModel(options);
    }

    return {
      generateContent: async (prompt) => {
        let textResponse = "";
        const promptLower = prompt.toLowerCase();

        if (promptLower.includes("careerpath") || promptLower.includes("career path")) {
          // CareerRoadmapGenerator
          const currentRoleMatch = prompt.match(/Current Role:\s*([^\n\r]+)/i);
          const targetRoleMatch = prompt.match(/Target Role:\s*([^\n\r]+)/i);
          const currentRole = currentRoleMatch ? currentRoleMatch[1].trim() : "your current role";
          const targetRole = targetRoleMatch ? targetRoleMatch[1].trim() : "your target role";
          const capTargetRole = targetRole.charAt(0).toUpperCase() + targetRole.slice(1);

          textResponse = JSON.stringify({
            careerPath: [
              {
                step: 1,
                title: `Build Foundational Skills for ${capTargetRole}`,
                description: `Master the core principles, essential software/tools, and basic design paradigms for becoming a ${targetRole}. Focus on filling the gaps between your background as a ${currentRole} and the requirements of ${targetRole}.`,
                duration: "3-6 months"
              },
              {
                step: 2,
                title: `Intermediate Practice & Project Work`,
                description: `Apply your new skillset by building medium-scale projects or taking on shadowed responsibilities. Transition from the ${currentRole} mindset into standard industry workflows for a professional ${targetRole}.`,
                duration: "6-12 months"
              },
              {
                step: 3,
                title: `Scale, Certify & Lead as a ${capTargetRole}`,
                description: `Deep dive into advanced methodologies, industry certification standards, and full pipeline ownership. Mentor junior members and demonstrate complete competence as a professional ${targetRole}.`,
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
        else if (promptLower.includes("cover letter") || promptLower.includes("coverletter")) {
          // CoverLetterGenerator
          textResponse = JSON.stringify({
            coverLetter: "Dear Hiring Manager,\n\nI am writing to express my enthusiastic interest in the Software Engineer position. With my background in building high-performance web applications and working with modern React and Node.js codebases, I am confident that I can contribute immediately to your product development goals.\n\nIn my previous projects, I successfully implemented responsive designs, optimized system state rendering, and integrated third-party APIs. I enjoy solving complex architectural challenges and collaborating with cross-functional teams to build clean, maintainable systems.\n\nThank you for your time and consideration. I look forward to discussing how my skills and experience can support your engineering achievements.\n\nSincerely,\n[Your Name]"
          });
        }
        else if (promptLower.includes("company")) {
          // CompanyOverview
          const companyMatch = prompt.match(/company\s+["']([^"']+)["']/i) || prompt.match(/company:\s*([^\n\r]+)/i);
          const companyName = companyMatch ? companyMatch[1].trim() : "the company";
          const companyKey = companyName.toLowerCase();

          let companyData = [];

          if (companyKey.includes("google")) {
            companyData = [
              {
                "section": "Overview",
                "content": "Google is a global technology leader focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics."
              },
              {
                "section": "Culture",
                "content": "Google is famous for its open, collaborative culture, emphasis on 'Googliness', high engineering autonomy, innovation 20% project time, and generous perks."
              },
              {
                "section": "Latest News",
                "content": "Google continues to expand its Gemini AI ecosystem across Search, Workspace, and Android, while investing heavily in custom TPU v5p accelerators for AI workloads."
              },
              {
                "section": "Key Facts",
                "content": "- **Founded**: 1998 by Larry Page and Sergey Brin\n- **Headquarters**: Mountain View, California\n- **Primary Tech**: C++, Java, Python, Go, TypeScript"
              },
              {
                "section": "Customer Reviews",
                "content": "Very high developer satisfaction (4.5/5 stars) praising search precision, developer platform utilities, and Google Cloud services."
              },
              {
                "section": "Financials",
                "content": "Consistently strong double-digit growth. Annual revenue exceeding $300 billion, driven primarily by Google Search ads, YouTube ads, and Google Cloud expansion."
              },
              {
                "section": "Competitors",
                "content": "Microsoft (in search/AI/cloud), Amazon (in cloud/ads), Meta (in advertising), Apple (in mobile platforms)."
              }
            ];
          } else if (companyKey.includes("tesla")) {
            companyData = [
              {
                "section": "Overview",
                "content": "Tesla is an American multinational automotive and clean energy company that designs and manufactures electric vehicles, battery energy storage from home to grid-scale, solar panels and solar roof tiles."
              },
              {
                "section": "Culture",
                "content": "Fast-paced, high-intensity, and mission-driven. Tesla values first-principles thinking, rapid iteration, and direct execution over bureaucratic processes."
              },
              {
                "section": "Latest News",
                "content": "Tesla is ramping up Cybertruck production, expanding Gigafactories globally, and rolling out next-generation Full Self-Driving (FSD) Beta updates."
              },
              {
                "section": "Key Facts",
                "content": "- **Founded**: 2003 by Martin Eberhard and Marc Tarpenning (led by Elon Musk)\n- **Headquarters**: Austin, Texas\n- **Primary Tech**: C++, Python, Rust, Custom Silicon (FSD)"
              },
              {
                "section": "Customer Reviews",
                "content": "High enthusiast rating (4.4/5 stars) celebrating performance and charging infrastructure, though occasionally facing scrutiny on service wait times."
              },
              {
                "section": "Financials",
                "content": "Highly profitable automotive business with billions in free cash flow, operating margin leads the volume auto industry, and significant energy storage revenue growth."
              },
              {
                "section": "Competitors",
                "content": "Traditional automakers (BYD, Ford, GM), electric startups (Rivian, Lucid), and energy companies."
              }
            ];
          } else if (companyKey.includes("apple")) {
            companyData = [
              {
                "section": "Overview",
                "content": "Apple is a global technology giant famous for consumer electronics, software, and services. It is the world's largest technology company by revenue and is renowned for the iPhone, iPad, Mac, and Apple Watch."
              },
              {
                "section": "Culture",
                "content": "Highly detail-oriented, secretive, and design-led. Apple focuses on high-quality craft, end-to-end integration, and functional organizational structures."
              },
              {
                "section": "Latest News",
                "content": "Apple recently announced Apple Intelligence, integrating privacy-focused generative models across iOS, iPadOS, and macOS."
              },
              {
                "section": "Key Facts",
                "content": "- **Founded**: 1976 by Steve Jobs, Steve Wozniak, and Ronald Wayne\n- **Headquarters**: Cupertino, California\n- **Primary Tech**: Swift, Objective-C, C++, Metal"
              },
              {
                "section": "Customer Reviews",
                "content": "Exceptional customer loyalty (4.7/5 stars) for hardware build quality, ecosystem integration, and privacy protection."
              },
              {
                "section": "Financials",
                "content": "Extremely strong financial profile with massive cash reserves, high-margin services segment, and over $380 billion in annual revenue."
              },
              {
                "section": "Competitors",
                "content": "Samsung (in smartphones), Google (in mobile OS), Microsoft (in OS/laptops), Meta (in AR/VR headsets)."
              }
            ];
          } else if (companyKey.includes("microsoft")) {
            companyData = [
              {
                "section": "Overview",
                "content": "Microsoft is a multinational technology corporation best known for its Windows operating system, Office productivity suite, Azure cloud computing platform, and its partnership with OpenAI."
              },
              {
                "section": "Culture",
                "content": "Emphasizes a 'growth mindset', collaborative work environment, and large-scale enterprise execution under CEO Satya Nadella."
              },
              {
                "section": "Latest News",
                "content": "Microsoft is deeply integrating Copilot AI capabilities across Windows, Office, and GitHub, while expanding Azure's AI infrastructure."
              },
              {
                "section": "Key Facts",
                "content": "- **Founded**: 1975 by Bill Gates and Paul Allen\n- **Headquarters**: Redmond, Washington\n- **Primary Tech**: C#, C++, TypeScript, Python"
              },
              {
                "section": "Customer Reviews",
                "content": "Trusted enterprise rating (4.5/5 stars) for Azure scalability, GitHub developer tools, and comprehensive productivity suites."
              },
              {
                "section": "Financials",
                "content": "Excellent diversified revenues with strong cloud growth, operating margins exceeding 40%, and robust SaaS subscription revenues."
              },
              {
                "section": "Competitors",
                "content": "Amazon (in cloud computing), Google (in productivity/search/AI), Apple (in operating systems/devices)."
              }
            ];
          } else if (companyKey.includes("amazon")) {
            companyData = [
              {
                "section": "Overview",
                "content": "Amazon is an e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence multinational."
              },
              {
                "section": "Culture",
                "content": "Obsessed with customer centricity, long-term thinking, high ownership, and a writing-first culture (6-page narratives instead of PowerPoints)."
              },
              {
                "section": "Latest News",
                "content": "Amazon is deploying Rufus (its shopping AI), expanding Bedrock AI services on AWS, and scaling its regional logistics network."
              },
              {
                "section": "Key Facts",
                "content": "- **Founded**: 1994 by Jeff Bezos\n- **Headquarters**: Seattle, Washington\n- **Primary Tech**: Java, C++, Python, Kotlin, AWS Lambda"
              },
              {
                "section": "Customer Reviews",
                "content": "E-commerce customer satisfaction is high (4.6/5 stars) for shipping speeds, while AWS developers praise its comprehensive feature catalog."
              },
              {
                "section": "Financials",
                "content": "Strong e-commerce margins combined with highly profitable AWS cloud revenues driving net income and global logistics investments."
              },
              {
                "section": "Competitors",
                "content": "Walmart/Shopify (in retail), Microsoft/Google (in cloud computing/AI), Netflix (in streaming)."
              }
            ];
          } else if (companyKey.includes("meta")) {
            companyData = [
              {
                "section": "Overview",
                "content": "Meta (formerly Facebook) builds technologies that help people connect, find communities, and grow businesses. It operates Facebook, Instagram, WhatsApp, and Threads."
              },
              {
                "section": "Culture",
                "content": "Under the banner 'Move Fast', Meta maintains a flat organization, strong engineering ownership, and open-source contributions (e.g. React, PyTorch, Llama)."
              },
              {
                "section": "Latest News",
                "content": "Meta is rapidly advancing its open-source Llama AI models and expanding Meta AI assistant availability across its social apps."
              },
              {
                "section": "Key Facts",
                "content": "- **Founded**: 2004 by Mark Zuckerberg\n- **Headquarters**: Menlo Park, California\n- **Primary Tech**: Hack/PHP, C++, Python, JavaScript"
              },
              {
                "section": "Customer Reviews",
                "content": "High engagement ratings, developer communities highly praise Meta's open-source contributions (React, Llama, PyTorch)."
              },
              {
                "section": "Financials",
                "content": "Driven by digital advertising revenue on family of apps, returning billions in free cash flow and investing heavily in Reality Labs (AR/VR)."
              },
              {
                "section": "Competitors",
                "content": "TikTok, ByteDance, Google (in ads), Apple (in platform privacy/hardware)."
              }
            ];
          } else if (companyKey.includes("netflix")) {
            companyData = [
              {
                "section": "Overview",
                "content": "Netflix is a subscription video on-demand over-the-top streaming service and production company. It is one of the world's leading entertainment services."
              },
              {
                "section": "Culture",
                "content": "A high-performance culture based on freedom and responsibility. Netflix values stunning colleagues, high talent density, and the keeper test."
              },
              {
                "section": "Latest News",
                "content": "Netflix is expanding its gaming catalog, live streaming sports/events, and investing heavily in local language content productions globally."
              },
              {
                "section": "Key Facts",
                "content": "- **Founded**: 1997 by Reed Hastings and Marc Randolph\n- **Headquarters**: Los Gatos, California\n- **Primary Tech**: Java, JavaScript, Python, Node.js"
              },
              {
                "section": "Customer Reviews",
                "content": "High satisfaction (4.5/5 stars) for interface ease-of-use and recommendation algorithms, though user feedback varies on subscription tier pricing."
              },
              {
                "section": "Financials",
                "content": "Strong operating margins, positive free cash flow, and healthy annual revenue exceeding $30 billion from subscription fees."
              },
              {
                "section": "Competitors",
                "content": "Disney+, Amazon Prime Video, Max, YouTube."
              }
            ];
          } else {
            // Generic template with dynamically generated capitalized company name
            const capitalizedName = companyName.charAt(0).toUpperCase() + companyName.slice(1);
            companyData = [
              {
                "section": "Overview",
                "content": `${capitalizedName} is a prominent organization recognized for its dedication to quality and innovation in its sector. It focuses on providing reliable solutions and driving growth.`
              },
              {
                "section": "Culture",
                "content": `A focus on collaboration, continuous improvement, and customer satisfaction. The engineering and product teams work closely to deliver high-quality releases with modern development workflows.`
              },
              {
                "section": "Latest News",
                "content": `${capitalizedName} recently announced new initiatives to expand its product line, optimize its operations, and incorporate modern digital experiences to better serve clients.`
              },
              {
                "section": "Key Facts",
                "content": `- **Founded**: 2015\n- **Headquarters**: Distributed / Remote\n- **Primary Tech**: React, Node.js, modern web frameworks`
              },
              {
                "section": "Customer Reviews",
                "content": `Positive reviews (4.2/5 stars) highlighting product utility, friendly service, and responsiveness to customer feedback.`
              },
              {
                "section": "Financials",
                "content": `Showing steady financial progress with solid performance metrics, stable margins, and consistent growth in its key markets.`
              },
              {
                "section": "Competitors",
                "content": `Mainly other modern companies and platforms operating in the same industry segment.`
              }
            ];
          }

          textResponse = JSON.stringify(companyData);
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
          const userMsgMatch = prompt.match(/Answer this:\s*["']([^"']+)["']/i) || [null, promptLower];
          const userMsg = (userMsgMatch[1] || promptLower).toLowerCase();

          if (userMsg.includes("hello") || userMsg.includes("hi ") || userMsg.includes("hey")) {
            textResponse = "Hello! I'm your MockMate AI assistant. I'm here to help you prepare for interviews, analyze your resume, research company information, or practice coding. What are you working on today?";
          } else if (userMsg.includes("resume")) {
            textResponse = "To get the best out of your resume, make sure you include quantitative impact metrics (e.g., *'optimized load times by 40%'*), clear technical categorizations (Frontend, Backend, Infrastructure), and keep it to 1-2 pages maximum. You can upload and analyze your resume in the **Resume Analyzer** tab!";
          } else if (userMsg.includes("interview")) {
            textResponse = "MockMate provides simulated AI interviews! You can select a role, set your experience level, and start a realistic audio/video mock interview. Head over to the **AI Interview** dashboard to begin.";
          } else if (userMsg.includes("system design") || userMsg.includes("architecture")) {
            textResponse = "When designing systems, always consider: \n1. **Scalability** (Horizontal vs. Vertical)\n2. **Availability** (Redundancy, replication)\n3. **Latency** (Caching with Redis, CDNs, database indexing)\n4. **Consistency** (SQL ACID vs. NoSQL CAP Theorem)";
          } else if (userMsg.includes("javascript") || userMsg.includes("react")) {
            textResponse = "React performance can be enhanced using: \n- **React.memo** to skip re-rendering unchanged components.\n- **useCallback** and **useMemo** to cache function definitions and computed values.\n- **Virtualization** for displaying very long lists efficiently.";
          } else {
            textResponse = `That's an interesting question! In a real environment, I would query the Gemini model to provide a specialized response. In this mock trial mode, I can recommend checking out MockMate's key pages:\n\n- **AI Resume Analyzer**: Upload and check ATS compatibility score.\n- **AI Interview Simulator**: Interactive mock video interviews.\n- **Company Research Assistant**: Search stats, culture, news, and financials.\n- **Career Path Roadmap**: Generate step-by-step career milestones.`;
          }
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
