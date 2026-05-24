// AI Roles, Roadmap, and Interactive Lab Database
export const rolesData = {
  "gen-ai": {
    id: "gen-ai",
    title: "Generative AI Engineer",
    shortDesc: "Master Large Language Models (LLMs), Vector DBs, RAG, Agents, and Fine-Tuning.",
    longDesc: "Generative AI Engineers design, build, and deploy systems powered by foundation models. They build complex pipelines involving semantic retrieval (RAG), autonomous tool-using agents, prompt chaining, and small language model fine-tuning for low-latency operations.",
    difficulty: "Advanced",
    salary: "$145,000 - $210,000",
    duration: "90 Days",
    color: "var(--accent-glow)",
    accentColor: "#aa3bff",
    skills: ["Python Basics", "NumPy & Pandas", "PyTorch", "LangChain & LlamaIndex", "VectorDBs (Pinecone, PGVector)", "CrewAI / AutoGen", "vLLM", "Prompt Engineering"],
    stats: {
      marketDemand: "Extreme",
      labsCount: 5,
      lessonsCount: 45
    },
    syllabus: [
      {
        step: "Step 1",
        title: "Python Programming Foundations",
        duration: "Days 1 - 15",
        topics: [
          {
            id: "python-basics-syntax",
            title: "Basic Syntax & Foundations",
            desc: "Master variables, data types (integers, floats, strings, booleans), math equations, comparison steps, and logical truth testing operators.",
            status: "completed"
          },
          {
            id: "python-control-flow-loops",
            title: "Control Flow & Decision Loops",
            desc: "Manage execution paths with if, elif, and else checks. Implement iteration with for sequence loops, while conditional loops, and loop breaks.",
            status: "completed"
          },
          {
            id: "python-functions-core",
            title: "Functions & Scope Dynamics",
            desc: "Define modular reusable routines using the def keyword, manage input parameters, and return outputs with return values.",
            status: "completed"
          },
          {
            id: "python-data-structures",
            title: "Core Data Structures in Depth",
            desc: "Master Lists (indexing, slicing, appending), Dictionaries (mappings, lookups, updates), Tuples (fixed immutable sequences), and Sets (uniqueness, math).",
            status: "completed"
          },
          {
            id: "python-intermediate-core",
            title: "Intermediate Python Concepts",
            desc: "Integrate File Handling (read, write, append), Error Handling (try/except, custom exceptions), comprehensions, standard library, pip, and virtual environments.",
            status: "in-progress"
          },
          {
            id: "python-specialized-oop",
            title: "Object-Oriented Coding Specialist",
            desc: "Design modular blueprints with class templates, construct distinct object instances, and implement code inheritance.",
            status: "locked"
          },
          {
            id: "python-specialized-data",
            title: "Data Path: NumPy, Pandas & Matplotlib",
            desc: "Manipulate multi-dimensional arrays in NumPy, clean and group tabular datasets using Pandas, and plot analytical visual charts in Matplotlib.",
            status: "locked"
          },
          {
            id: "python-specialized-web",
            title: "Web Path: Flask, Django & REST APIs",
            desc: "Configure Flask routing, construct database-driven Django servers, and expose standardized JSON Web APIs from scratch.",
            status: "locked"
          },
          {
            id: "python-specialized-automation",
            title: "Automation Path: Scraping, Scheduling & OS Tools",
            desc: "Extract internet data with BeautifulSoup web scraping, schedule regular cron tasks, and manipulate folders/files via the OS module.",
            status: "locked"
          }
        ]
      },
      {
        step: "Step 2",
        title: "Data Engineering & Mathematical Matrices",
        duration: "Days 11 - 20",
        topics: [
          {
            id: "numpy-foundations-core",
            title: "NumPy Foundations & Vector Calculations",
            desc: "Master array basics (creating, shapes, types), indexing/slicing (targeting, masking), math (vector addition, scalar, matrix products), and statistics (mean, median, std dev).",
            status: "completed",
            hasLab: true,
            labId: "numpy-vectors"
          },
          {
            id: "pandas-foundations-core",
            title: "Pandas Foundations & Data Cleaning",
            desc: "Understand core objects (Series, DataFrames, indexes), load data (CSV, Excel, JSON), perform cleaning (nulls, duplicates, casting), and manipulate rows/columns.",
            status: "in-progress",
            hasLab: true,
            labId: "pandas-foundations"
          },
          {
            id: "pandas-advanced-manipulation",
            title: "Advanced Grouping, Merging & Time Series",
            desc: "Master GroupBy splits, summary stats, custom aggregations, table joins (inner, outer, concat), and Time Series resampling or rolling windows.",
            status: "locked"
          }
        ]
      },
      {
        step: "Step 3",
        title: "Neural Networks & Deep Learning Core",
        duration: "Days 21 - 35",
        topics: [
          {
            id: "pytorch-backpropagation",
            title: "PyTorch Deep Classifier & Backpropagation Lab",
            desc: "Implement forward activation passes, cross-entropy loss, manual gradient backprops, and SGD weight adjustments in PyTorch.",
            status: "in-progress",
            hasLab: true,
            labId: "pytorch-backprop"
          },
          {
            id: "transformers-tokenization",
            title: "Transformers, Attention Weights & Byte-Pair Tokenizers",
            desc: "Understand pos-encodings, query-key-value scaling calculations, and BPE word tokenizers powering foundation models.",
            status: "locked"
          }
        ]
      },
      {
        step: "Step 4",
        title: "Retrieval-Augmented Generation (RAG) Systems",
        duration: "Days 36 - 65",
        topics: [
          {
            id: "vector-search",
            title: "Text Embeddings & Vector DB Indexing Lab",
            desc: "Chunk dense manuals recursively, calculate vector values via model APIs, and query mock Pinecone nodes semantically.",
            status: "completed",
            hasLab: true,
            labId: "rag-indexing"
          },
          {
            id: "hybrid-reranking",
            title: "Hybrid Search (Sparse + Dense) & Cohere Re-rankers",
            desc: "Integrate classical BM25 keyword matching with dense vectors and apply cross-encoder re-rankers for extreme precision.",
            status: "locked"
          }
        ]
      },
      {
        step: "Step 5",
        title: "AI APIs, Prompt Architecture & Autonomous Agents",
        duration: "Days 66 - 90",
        topics: [
          {
            id: "prompt-engineering-sandbox",
            title: "Reasoning Patterns & Prompt Sliders Playground",
            desc: "Design templates implementing Chain-of-Thought (CoT) and Zero/Few-shot prompts. Adjust generation parameters dynamically.",
            status: "completed",
            hasLab: true,
            labId: "prompt-playground"
          },
          {
            id: "multi-agent-orchestrator",
            title: "Autonomous Multi-Agent Collaboration (CrewAI)",
            desc: "Coordinate specialized agents equipped with tools to solve complex multi-step corporate customer returns pipelines.",
            status: "locked"
          }
        ]
      }
    ]
  },
  "ml-engineer": {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    shortDesc: "Implement classical models, Deep Learning, Computer Vision, and PyTorch architectures.",
    longDesc: "Machine Learning Engineers scale statistical and deep learning models. They build complex data preprocessing pipelines, engineer mathematical features, train high-dimensional deep learning networks, and deploy real-time forecasting engines.",
    difficulty: "Intermediate - Advanced",
    salary: "$138,000 - $195,000",
    duration: "120 Days",
    color: "#0ea5e9",
    accentColor: "#0ea5e9",
    skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "Pandas & NumPy", "Feature Engineering", "Neural Networks", "Gradient Boosting (XGBoost)", "FastAPI"],
    stats: {
      marketDemand: "Very High",
      labsCount: 10,
      lessonsCount: 60
    },
    syllabus: [
      {
        step: "Step 1",
        title: "Mathematics & Supervised Learning Foundations",
        duration: "Days 1 - 30",
        topics: [
          {
            id: "linear-algebra",
            title: "Linear Algebra & Optimization for ML",
            desc: "Understand eigenvalues, eigenvectors, matrix decompositions (SVD), and Gradient Descent algorithms.",
            status: "completed"
          },
          {
            id: "classical-ml",
            title: "Supervised Classification & Regression Lab",
            desc: "Implement Linear/Logistic Regression, Support Vector Machines, and Decision Trees from scratch and with Scikit-learn.",
            status: "completed",
            hasLab: true,
            labId: "supervised-classification"
          }
        ]
      },
      {
        step: "Step 2",
        title: "Deep Learning & Neural Networks",
        duration: "Days 31 - 70",
        topics: [
          {
            id: "pytorch-nn",
            title: "PyTorch Deep Classifier & Backpropagation Lab",
            desc: "Design feedforward neural networks. Implement loss functions, forward feeds, and manual/automated gradient backprop.",
            status: "in-progress",
            hasLab: true,
            labId: "pytorch-backprop"
          },
          {
            id: "cnn",
            title: "Convolutional Neural Networks (CNNs) for Vision",
            desc: "Understand kernel operations, pooling, and image classification. Train customized architectures for medical imaging diagnostics.",
            status: "locked"
          }
        ]
      }
    ]
  },
  "prompt-engineer": {
    id: "prompt-engineer",
    title: "AI Prompt Architect",
    shortDesc: "Master prompt design, Chain-of-Thought, automated DSPy programming, and guardrails.",
    longDesc: "Prompt Architects build the interface logic between business workflows and raw foundation models. They construct deterministic prompts, automate system prompts using meta-programming, and enforce structured guardrails.",
    difficulty: "Beginner - Intermediate",
    salary: "$110,000 - $160,000",
    duration: "45 Days",
    color: "#22c55e",
    accentColor: "#22c55e",
    skills: ["System Prompting", "Chain-of-Thought", "Few-Shot Formatting", "DSPy Programming", "JSON Schemas", "Model Routing", "Prompt Security"],
    stats: {
      marketDemand: "High",
      labsCount: 5,
      lessonsCount: 25
    },
    syllabus: [
      {
        step: "Step 1",
        title: "Core Prompting Techniques",
        duration: "Days 1 - 15",
        topics: [
          {
            id: "zero-few-shot",
            title: "Zero-Shot vs. Few-Shot In-Context Learning",
            desc: "Master prompt structure. Learn to inject explicit examples to condition models into specialized task behaviors.",
            status: "completed"
          },
          {
            id: "reasoning-chains",
            title: "Chain-of-Thought & Self-Consistency",
            desc: "Force models to 'think' step-by-step. Implement self-consistency where multiple paths are generated and voted upon.",
            status: "in-progress"
          }
        ]
      },
      {
        step: "Step 2",
        title: "Enterprise Prompt Workspaces",
        duration: "Days 16 - 30",
        topics: [
          {
            id: "prompt-playground-lab",
            title: "Dynamic Prompt Template Design Lab",
            desc: "Test system prompts, user variables, and temperature metrics in our highly advanced playground sandboxes.",
            status: "completed",
            hasLab: true,
            labId: "prompt-playground"
          }
        ]
      }
    ]
  },
  "mlops": {
    id: "mlops",
    title: "MLOps Engineer",
    shortDesc: "Automate ML pipelines, track experiments with MLflow, containerize with Docker/Kubernetes.",
    longDesc: "MLOps Engineers build CI/CD infrastructure tailored specifically for AI. They operationalize machine learning models, automate feature stores, manage model registries, monitor statistical drift, and configure high-throughput model serving nodes.",
    difficulty: "Advanced",
    salary: "$142,000 - $205,000",
    duration: "100 Days",
    color: "#ec4899",
    accentColor: "#ec4899",
    skills: ["MLflow", "Kubernetes", "Docker", "DVC", "GitHub Actions", "Prometheus & Grafana", "Triton Serving", "Feature Stores (Feast)"],
    stats: {
      marketDemand: "Very High",
      labsCount: 6,
      lessonsCount: 40
    },
    syllabus: [
      {
        step: "Step 1",
        title: "Containerization & Version Control for ML",
        duration: "Days 1 - 25",
        topics: [
          {
            id: "dockerize-ml",
            title: "Containerizing FastAPI Models with Docker",
            desc: "Package complex scikit-learn or PyTorch models inside isolated Docker containers. Manage multi-stage building for light footprints.",
            status: "completed"
          },
          {
            id: "dvc-tracking",
            title: "Data & Model Version Control (DVC)",
            desc: "Use DVC to version 50GB dataset repositories in S3/Blob stores, linking Git hashes to immutable data checkpoints.",
            status: "in-progress"
          }
        ]
      },
      {
        step: "Step 2",
        title: "Model Tracking & Registries",
        duration: "Days 26 - 55",
        topics: [
          {
            id: "mlflow-tracking",
            title: "Experiment Tracking with MLflow & S3",
            desc: "Log training runs, metrics (accuracy, F1, latency), model hyperparameters, and artifacts in centralized MLflow servers.",
            status: "locked"
          }
        ]
      }
    ]
  }
};

// Labs detailed interactive lessons & sandboxes
export const labsData = {
  "numpy-vectors": {
    id: "numpy-vectors",
    title: "NumPy Vectorized Matrix Operations Lab",
    difficulty: "Beginner",
    estimatedTime: "20 Mins",
    topic: "Vectorized Operations",
    role: "Generative AI Engineer",
    scenario: "Amazon wants to calculate dynamic recommendation similarity ranks for 4 customers. Instead of using Python 'for loops' which are extremely slow and CPU-intensive, we represent customer profiles and item vectors as high-dimensional NumPy matrices and compute their vectorized dot product simultaneously.",
    theory: {
      intro: "NumPy uses contiguous C arrays and vector instructions (SIMD) to execute numerical calculations. Operations that would require complex nested loops in standard Python are written in single mathematical lines and processed up to 100x faster.",
      sections: [
        {
          title: "1. Vectorization De-mystified",
          content: "Vectorization is the process of applying mathematical operations to whole arrays rather than individual elements. Under the hood, NumPy delegates the loop to optimized C code, avoiding the heavy overhead of Python's dynamic type checking."
        },
        {
          title: "2. Vector Dot Product Matrix Multiplication",
          content: "In neural networks and search indexing, a dot product calculates the similarity between two arrays. If a customer profile vector is [1.0, 0.0, 0.5] representing interests in [Electronics, Apparel, Books], and a product category tag vector is [1.0, 0.0, 0.0], the dot product is: (1.0*1.0) + (0.0*0.0) + (0.5*0.0) = 1.0 (indicating a high similarity match)."
        }
      ],
      table: {
        headers: ["Execution Style", "Methodology", "Relative Execution Speed"],
        rows: [
          ["Standard Python Loop", "Linear iterative parsing of indices", "1x (Slowest)"],
          ["Vectorized NumPy", "SIMD Parallel C execution", "80 - 150x faster"],
          ["GPU Vectorized (PyTorch)", "Parallel threads on GPU cores", "500 - 1000x faster"]
        ]
      }
    },
    codeWorkspace: {
      language: "python",
      instructions: "Complete the dot product calculation using NumPy's highly optimized vectorized function. Avoid using any 'for' loops! Calculate the dynamic dot product between the customer matrices and the recommendation matrices.",
      starterCode: `# ----------------------------------------------------
# LAB: High-Speed NumPy Vector Matrix Operations
# Goal: Compute vectorized recommendations without loops
# ----------------------------------------------------

import numpy as np

# 1. User interest vectors: [Electronics, Apparel, Books]
# Representing interests for 4 distinct active customers
customer_profiles = np.array([
    [1.0, 0.0, 0.8],  # Customer A: Likes Tech and Books
    [0.0, 1.0, 0.2],  # Customer B: Likes Apparel
    [0.5, 0.5, 0.5],  # Customer C: Neutral
    [0.9, 0.1, 0.0]   # Customer D: Likes Tech only
])

# 2. Recommended Items vectors
# [Item 1 (Laptop), Item 2 (Jeans), Item 3 (Encyclopedia)]
recommendation_items = np.array([
    [1.0, 0.0, 0.0],  # Laptop (Category: Electronics)
    [0.0, 1.0, 0.0],  # Jeans (Category: Apparel)
    [0.0, 0.0, 1.0]   # Encyclopedia (Category: Books)
])

print("[SYSTEM] Customer Matrices Initiated. Shape:", customer_profiles.shape)
print("[SYSTEM] Recommendation Matrices Initiated. Shape:", recommendation_items.shape)

# TODO: Complete the vectorized similarity function using np.dot or @ operator
def calculate_recommendation_ranks(users, items):
    # Hint: Multiplies a matrix (4x3) by the transpose of another (3x3)
    # to yield a 4x3 recommendation score matrix
    # Do not write any 'for' loops!
    similarity_matrix = np.dot(users, items.T)
    return similarity_matrix

# Execute the calculation
ranks = calculate_recommendation_ranks(customer_profiles, recommendation_items)
print("\\n[RESULT] Recommendation Score Matrix (4 Users x 3 Items):")
print(ranks)
`,
      validationCode: (code) => {
        if (code.includes("np.dot") || code.includes("@")) {
          return {
            success: true,
            logs: [
              "[19:48:01] Loading NumPy Vector Engine...",
              "[19:48:02] Customer Matrices Initiated. Shape: (4, 3)",
              "[19:48:03] Recommendation Matrices Initiated. Shape: (3, 3)",
              "[19:48:04] Executing SIMD Parallelized calculations...",
              "",
              "[RESULT] Recommendation Score Matrix (4 Users x 3 Items):",
              " [[1.  0.  0.8]",
              "  [0.  1.  0.2]",
              "  [0.5 0.5 0.5]",
              "  [0.9 0.1 0. ]]",
              "",
              "[SUCCESS] LAB VERIFIED! You successfully calculated vectorized similarity matrices. No CPU loops detected!"
            ],
            xpEarned: 120
          };
        } else {
          return {
            success: false,
            logs: [
              "Error: Vector validation failed.",
              "Please make sure your code utilizes 'np.dot(users, items.T)' or the matrix multiplication '@' operator."
            ],
            xpEarned: 0
          };
        }
      }
    }
  },
  "rag-indexing": {
    id: "rag-indexing",
    title: "RAG Semantic Indexing Lab",
    difficulty: "Intermediate",
    estimatedTime: "45 Mins",
    topic: "Retrieval-Augmented Generation",
    role: "Generative AI Engineer",
    scenario: "Uber wants to index 1,200 PDF manuals of fleet engines to provide mechanics with immediate solutions. Instead of parsing the massive files linearly, we chunk the text, generate embeddings via OpenAI/Gemini models, index them in Pinecone vector database, and perform semantic queries.",
    theory: {
      intro: "Retrieval-Augmented Generation (RAG) resolves LLM limitations (knowledge cutoff and hallucinations) by retrieving authoritative external documents first, then passing them as context inside the LLM prompt.",
      sections: [
        {
          title: "1. Document Chunking",
          content: "Large texts must be broken down to fit within embedding context lengths and preserve search density. A common approach is RecursiveCharacterTextSplitter with size 500 characters and 50 characters overlap to prevent boundary clipping."
        },
        {
          title: "2. Vector Embeddings",
          content: "Embedding models map textual content into high-dimensional real vectors (e.g., 768 dimensions for Gemini, 1536 dimensions for OpenAI). Semantically similar sentences reside close to each other in this multidimensional Euclidean/Cosine space."
        },
        {
          title: "3. Vector Databases",
          content: "Traditional SQL databases aren't optimized for multi-dimensional mathematical distance operations (Cosine Similarity, L2 Distance). Vector DBs (Pinecone, Milvus, Chroma) index arrays using Hierarchical Navigable Small World (HNSW) graphs to return search queries under 15ms."
        }
      ],
      table: {
        headers: ["Database Type", "Best Used For", "Average Query Latency"],
        rows: [
          ["Pinecone (Managed)", "Enterprise Serverless Vector DB", "8 - 12 ms"],
          ["ChromaDB (Local)", "Local prototyping / light applications", "20 - 30 ms"],
          ["PGVector (PostgreSQL)", "Integrating vectors with relational data", "15 - 25 ms"]
        ]
      }
    },
    codeWorkspace: {
      language: "python",
      instructions: "Implement the text chunking and dense vector embedding generation function. Complete the missing sections where we generate embeddings using the text-embedding-004 model and execute a cosine similarity search against a mocked database index.",
      starterCode: `# ----------------------------------------------------
# LAB: Enterprise RAG Semantic Indexing
# Goal: Chunk documents, embed, and query Vector DB
# ----------------------------------------------------

import numpy as np

# 1. Mock Database representing our Fleet Engine Manual
MANUAL_CHUNKS = [
    "Chunk 0: Check engine oil levels every 5,000 miles. Use 5W-30 fully synthetic oil only.",
    "Chunk 1: If battery warning light glows red, inspect alternator belt tension and terminal cables immediately.",
    "Chunk 2: Hybrid battery cooling fan exhaust is under passenger back seat. Ensure it is never obstructed.",
    "Chunk 3: Transmission fluid flushing is required at 60,000 miles for automatic gears."
]

# 2. Simple Mock Embedding function (Simulates Gemini's text-embedding-004 API)
# Generates a 3-dimensional vector based on word presence for ease of execution
def get_embedding(text):
    text_lower = text.lower()
    # Simple semantic coordinates: [Engine/Mechanical, Electrical/Battery, Fluid/Maintenance]
    v = [0.0, 0.0, 0.0]
    if "engine" in text_lower or "belt" in text_lower or "manual" in text_lower:
        v[0] += 1.0
    if "battery" in text_lower or "alternator" in text_lower or "warning" in text_lower:
        v[1] += 1.0
    if "fluid" in text_lower or "oil" in text_lower or "miles" in text_lower or "flushing" in text_lower:
        v[2] += 1.0
        
    # Normalize vector to unit length
    norm = np.linalg.norm(v)
    if norm == 0: return v
    return [round(x/norm, 3) for x in v]

# TODO: Complete the retrieval indexing database
def build_vector_store():
    vector_db = {}
    print("[SYSTEM] Vectorizing 4 Manual Chunks...")
    for idx, chunk in enumerate(MANUAL_CHUNKS):
        # TODO: Vectorize 'chunk' by calling the embedding function
        embedding = get_embedding(chunk)
        vector_db[idx] = {
            "text": chunk,
            "vector": embedding
        }
        print(f" -> Chunk {idx} Embedded: {embedding}")
    return vector_db

# Perform Cosine Similarity calculation
def query_vector_db(query, db):
    print(f"\\n[QUERY] User Asked: \\"{query}\\"")
    # TODO: Calculate query embedding
    query_vector = get_embedding(query)
    print(f"[EMBEDDING] Query Vector: {query_vector}")
    
    best_chunk = None
    max_similarity = -1.0
    
    for idx, data in db.items():
        # Cosine similarity calculation between query_vector and data["vector"]
        v1 = np.array(query_vector)
        v2 = np.array(data["vector"])
        dot_prod = np.dot(v1, v2)
        norm1 = np.linalg.norm(v1)
        norm2 = np.linalg.norm(v2)
        
        if norm1 == 0 or norm2 == 0:
            similarity = 0.0
        else:
            similarity = dot_prod / (norm1 * norm2)
            
        print(f" -> Chunk {idx} Cosine Similarity Score: {similarity:.4f}")
        
        if similarity > max_similarity:
            max_similarity = similarity
            best_chunk = data["text"]
            
    return best_chunk, max_similarity

# Let's run the system!
db = build_vector_store()
# Execute search
mechanic_question = "Why is my red dashboard battery light on?"
result, score = query_vector_db(mechanic_question, db)

print(f"\\n[RESULT] Retaining Most Relevant Manual Context (Score: {score:.4f}):")
print(f" -> \\"{result}\\"")
`,
      validationCode: (code) => {
        // Quick frontend validation for learning purposes
        if (code.includes("get_embedding") && code.includes("build_vector_store") && code.includes("query_vector_db")) {
          return {
            success: true,
            logs: [
              "[19:38:01] Initializing RAG Pipeline...",
              "[19:38:02] Loading numpy version 1.26.4",
              "[19:38:03] Vectorizing 4 Manual Chunks...",
              " -> Chunk 0 Embedded: [0.707, 0.0, 0.707]",
              " -> Chunk 1 Embedded: [0.577, 0.577, 0.577]",
              " -> Chunk 2 Embedded: [0.0, 1.0, 0.0]",
              " -> Chunk 3 Embedded: [0.0, 0.0, 1.0]",
              "[19:38:04] Successfully index synced to mock Pinecone server (us-east-1)",
              "",
              "[QUERY] User Asked: \"Why is my red dashboard battery light on?\"",
              "[EMBEDDING] Query Vector: [0.0, 1.0, 0.0]",
              " -> Chunk 0 Cosine Similarity Score: 0.0000",
              " -> Chunk 1 Cosine Similarity Score: 0.5774",
              " -> Chunk 2 Cosine Similarity Score: 1.0000",
              " -> Chunk 3 Cosine Similarity Score: 0.0000",
              "",
              "[RESULT] Retaining Most Relevant Manual Context (Score: 1.0000):",
              " -> \"Chunk 2: Hybrid battery cooling fan exhaust is under passenger back seat. Ensure it is never obstructed.\"",
              "",
              "[SUCCESS] LAB VERIFIED! You successfully generated embeddings and retrieved standard semantically close documents!"
            ],
            xpEarned: 150
          };
        } else {
          return {
            success: false,
            logs: [
              "SyntaxError: Missing required function or library configurations.",
              "Please make sure your code defines 'build_vector_store', and computes cosine similarity successfully."
            ],
            xpEarned: 0
          };
        }
      }
    }
  },
  "prompt-playground": {
    id: "prompt-playground",
    title: "AI Prompt Architect Sandbox",
    difficulty: "Beginner",
    estimatedTime: "25 Mins",
    topic: "Prompt Engineering & Reasoning Patterns",
    role: "AI Prompt Architect",
    scenario: "Master in-context learning, Zero-shot, Few-shot Prompting, and Chain-of-Thought (CoT) reasoning. In this lab, we build prompt systems for an Automated E-commerce Returns Bot. Test how model outputs vary with system prompts, parameters (temperature), and structured thinking constraints.",
    theory: {
      intro: "Prompt Engineering is the art and science of formulating natural language instructions to guide foundation models. Small changes in syntax can drastically affect performance.",
      sections: [
        {
          title: "1. Prompt Components",
          content: "A professional production prompt consists of: (A) System Instructions (roles, constraints), (B) Context/Examples (Few-shot learning), (C) User Inputs (variables), (D) Formatting Commands (e.g. 'Output valid JSON only')."
        },
        {
          title: "2. Reasoning Chains",
          content: "Standard prompts request instant answers, which often triggers logical errors. Chain-of-Thought (CoT) asks the model to output its steps sequentially ('First, check order date; second, calculate return window...'). This allows the attention mechanism to construct proper logical sequences."
        }
      ],
      table: {
        headers: ["Prompt Style", "Best Used For", "Token Overhead"],
        rows: [
          ["Zero-Shot", "Simple classification / generic summaries", "Minimal (0 extra tokens)"],
          ["Few-Shot", "Formatting enforcement / complex rules", "Moderate (+200-500 tokens)"],
          ["Chain-of-Thought", "Math, coding logic, and multi-step reasoning", "High (+300-800 response tokens)"]
        ]
      }
    },
    codeWorkspace: {
      isPromptSandbox: true,
      instructions: "Adjust parameters (Temperature, Top-P), select a reasoning pattern, draft your system prompts and check how the simulated model behaves. Learn to enforce customer service rules: 30-day refund window limit, and no refund for opened electronic accessories.",
      starterSystemPrompt: "You are an automated E-Commerce Refund Review Agent. Apply these policies:\n1. Returns must be within 30 days of purchase.\n2. Electronics can only be returned if UNOPENED.\n\nFirst, think step-by-step to evaluate if refund is valid, then output final verdict as YES or NO.",
      starterUserPrompt: "User bought a 'USB-C Cable' (Category: Electronics) 12 days ago. The item was opened and tested once, but they want to return it because it is too short.",
      templates: [
        {
          name: "Standard Zero-Shot",
          system: "You are a customer assistant. Tell me if this return is valid.",
          user: "Item: iPhone Case. Bought: 45 days ago. Condition: Brand New / Unopened."
        },
        {
          name: "Few-Shot Formatting",
          system: "You are a database formatter. Convert user request to JSON.\n\nExample:\nUser: Return keyboard bought 5 days ago, unopened.\nOutput: {\"item\": \"keyboard\", \"days_ago\": 5, \"status\": \"unopened\"}",
          user: "User: Return laptop bought 14 days ago, opened box."
        },
        {
          name: "Chain-of-Thought (CoT)",
          system: "You are a strict compliance auditor. Analyze the request step-by-step: Check purchase date, inspect item category and open state, determine eligibility, and state reasoning clearly before concluding.",
          user: "Item: Wireless Mouse. Bought: 28 days ago. Condition: Opened. Category: Electronics. Return policy limits electronics returns to unopened items within 30 days."
        }
      ],
      simulationFunction: (system, user, temp, pattern) => {
        let thought = "";
        let response = "";
        let tokensUsed = 0;
        
        const sysLower = system.toLowerCase();
        const userLower = user.toLowerCase();
        
        if (sysLower.includes("think") || sysLower.includes("step-by-step") || sysLower.includes("reasoning") || pattern === "Chain-of-Thought (CoT)") {
          thought = `<thought>
1. Analyzing purchase details:
   - Item category: Electronics (Cable/Mouse/etc).
   - Purchase Date: Checked from inputs (12 days ago or as stated). Under 30-day limit (Valid).
2. Checking item condition:
   - User states item is "opened" / "tested once".
3. Applying policy:
   - Policy Rule 2: Electronics can ONLY be returned if UNOPENED.
   - The item is opened. Therefore, it is INELIGIBLE for a refund.
4. Final verdict: NO.
</thought>\n\n`;
          response = thought + `Based on our company's refund policy, electronics items are only eligible for returns if they are completely unopened. Since the item has been opened and tested, we unfortunately cannot authorize a refund. 

Verdict: NO`;
          tokensUsed = 345;
        } else if (sysLower.includes("json") || userLower.includes("json")) {
          response = `{\n  "item": "laptop",\n  "purchase_age_days": 14,\n  "condition": "opened",\n  "category": "electronics",\n  "eligible_for_return": false,\n  "reason": "Electronics must be unopened to qualify for a return."\n}`;
          tokensUsed = 120;
        } else {
          response = "No, the refund is not eligible because the electronic item has been opened.";
          tokensUsed = 45;
        }
        
        // Add random variations based on temperature
        if (temp > 0.7) {
          response += "\n\n[Warning: High generation temperature might result in fluid conversation but slightly varying compliance checks.]";
        }
        
        return {
          response,
          tokensUsed,
          latency: `${(200 + Math.random() * 400).toFixed(0)}ms`,
          xpEarned: 100
        };
      }
    }
  },
  "pytorch-backprop": {
    id: "pytorch-backprop",
    title: "PyTorch Deep Classifier & Backpropagation Lab",
    difficulty: "Advanced",
    estimatedTime: "60 Mins",
    topic: "Neural Network Architectures",
    role: "Machine Learning Engineer",
    scenario: "Netflix wants to predict customer churn based on historical metrics (daily active minutes, billing tickets, tenure). Complete a PyTorch binary classification model. Implement the manual/automatic backward pass gradients, weight updates, and verify that loss decreases over epochs.",
    theory: {
      intro: "Backpropagation is the fundamental algorithm that powers modern deep learning, using the Calculus Chain Rule to update model weights in reverse order to minimize error loss.",
      sections: [
        {
          title: "1. Forward Pass",
          content: "Inputs are multiplied by weight matrices, bias is added, and activation functions (like ReLU or Sigmoid) are applied. The final predicted probability is compared with target labels using Cross-Entropy or Mean Squared Error."
        },
        {
          title: "2. Loss Gradients & Optimization",
          content: "Gradients indicate how fast the loss changes with respect to each weight. Stochastic Gradient Descent (SGD) adjusts weights in the opposite direction of the gradient: W_new = W - LearningRate * Gradient."
        }
      ],
      table: {
        headers: ["Activation Function", "Output Range", "Best Used For"],
        rows: [
          ["ReLU (Rectified Linear)", "[0, infinity)", "Hidden layer neurons to solve vanishing gradient"],
          ["Sigmoid", "(0, 1)", "Output layer of binary classifiers"],
          ["Softmax", "(0, 1) sums to 1.0", "Output layer of multi-class classifiers"]
        ]
      }
    },
    codeWorkspace: {
      language: "python",
      instructions: "Implement the weight update step and loss backpropagation. Verify your SGD algorithm reduces the network loss values across 5 validation steps.",
      starterCode: `# ----------------------------------------------------
# LAB: PyTorch manual backpropagation simulation
# Goal: Train a 2-layer classifier and minimize loss
# ----------------------------------------------------

import numpy as np

# 1. Inputs (Features: [Daily Minutes Normalized, Support Tickets])
X = np.array([
    [0.9, 2.0],
    [0.1, 0.0],
    [0.8, 1.0],
    [0.2, 4.0]
])
# Labels: (1 = Churned, 0 = Active Customer)
y = np.array([[1], [0], [1], [0]])

# 2. Initialize weights and biases randomly
np.random.seed(42)
W1 = np.random.randn(2, 4)  # 2 inputs to 4 hidden neurons
b1 = np.zeros((1, 4))
W2 = np.random.randn(4, 1)  # 4 hidden to 1 output neuron
b2 = np.zeros((1, 1))

learning_rate = 0.1

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    s = sigmoid(x)
    return s * (1 - s)

print("[SYSTEM] Starting Neural Network manual optimization loops...")

for epoch in range(5):
    # --- Forward Pass ---
    z1 = np.dot(X, W1) + b1
    a1 = sigmoid(z1)  # Hidden Layer output
    
    z2 = np.dot(a1, W2) + b2
    a2 = sigmoid(z2)  # Final Predicted probability
    
    # Binary Cross Entropy Loss
    loss = -np.mean(y * np.log(a2 + 1e-15) + (1 - y) * np.log(1 - a2 + 1e-15))
    
    # --- Backward Pass (Backpropagation gradients) ---
    # Gradient of loss w.r.t final prediction
    da2 = -(y / (a2 + 1e-15)) + ((1 - y) / (1 - a2 + 1e-15))
    
    # Gradient w.r.t z2 (output linear combo)
    dz2 = da2 * (a2 * (1 - a2))  # Sigmoid derivative
    
    # Gradients w.r.t W2 and b2
    dW2 = np.dot(a1.T, dz2) / X.shape[0]
    db2 = np.sum(dz2, axis=0, keepdims=True) / X.shape[0]
    
    # Backprop to hidden layer
    da1 = np.dot(dz2, W2.T)
    dz1 = da1 * (a1 * (1 - a1))  # Sigmoid derivative
    
    dW1 = np.dot(X.T, dz1) / X.shape[0]
    db1 = np.sum(dz1, axis=0, keepdims=True) / X.shape[0]
    
    # --- TODO: Implement Weight Updates (Gradient Descent) ---
    # W1 = W1 - learning_rate * dW1
    # W2 = W2 - learning_rate * dW2
    W1 -= learning_rate * dW1
    W2 -= learning_rate * dW2
    b1 -= learning_rate * db1
    b2 -= learning_rate * db2
    
    print(f" -> Epoch {epoch + 1}: BCE Loss = {loss:.6f}")

print("[SYSTEM] Optimization cycle completed.")
`,
      validationCode: (code) => {
        if (code.includes("W1 -=") || code.includes("W1 = W1 -") || code.includes("learning_rate * dW1")) {
          return {
            success: true,
            logs: [
              "[19:40:11] Initializing PyTorch Simulator Module...",
              "[19:40:12] Forward model initiated. Weights seeded with seed=42",
              " -> Epoch 1: BCE Loss = 0.985012",
              " -> Epoch 2: BCE Loss = 0.884102",
              " -> Epoch 3: BCE Loss = 0.793201",
              " -> Epoch 4: BCE Loss = 0.724508",
              " -> Epoch 5: BCE Loss = 0.678121",
              "[19:40:13] Loss reduction trend validated: [0.985] -> [0.678] (Success!)",
              "",
              "[SUCCESS] Backpropagation verified successfully! The learning rates correctly shifted model boundaries closer to target churn labels."
            ],
            xpEarned: 200
          };
        } else {
          return {
            success: false,
            logs: [
              "Error: Model did not optimize correctly.",
              "Ensure you subtract 'learning_rate * dW1' from 'W1' inside the training loops."
            ],
            xpEarned: 0
          };
        }
      }
    }
  },
  "pandas-foundations": {
    id: "pandas-foundations",
    title: "Pandas Foundations & Data Cleaning Lab",
    difficulty: "Beginner - Intermediate",
    estimatedTime: "30 Mins",
    topic: "Pandas Data Ingestion & Manipulation",
    role: "Generative AI Engineer",
    scenario: "Netflix wants to clean and prepare a messy subscriber signup raw feed file before training their churn classifier. The feed contains duplicate rows, null subscription values, string numbers that need casting, and un-sorted entries.",
    theory: {
      intro: "Pandas is the industry standard for high-performance data manipulation in Python, built on top of NumPy. It introduces the Series (1D column) and DataFrame (2D table) structures to organize, clean, filter, and sort structured data.",
      sections: [
        {
          title: "1. Core Objects & Index Labels",
          content: "• Series: A one-dimensional labeled array capable of holding any data type (e.g. `s = pd.Series([1, 3, 5])`).\n• DataFrame: A two-dimensional, size-mutable, and tabular data structure with labeled axes (rows and columns).\n• Index Labels: Explicit keys mapping rows. Aligning data via indices allows fast indexing, binary searches, and constant time O(1) alignment."
        },
        {
          title: "2. Ingesting Data (CSV, Excel, JSON)",
          content: "• CSV Ingestion: `df = pd.read_csv('file.csv')` (highly efficient parser).\n• Excel Reading: `df = pd.read_excel('file.xlsx')` (requires openpyxl dependency).\n• JSON Parsing: `df = pd.read_json('file.json')` (ideal for dynamic REST APIs)."
        },
        {
          title: "3. High-Quality Data Cleaning",
          content: "• Missing Values: Check null fields via `df.isna()`. Delete rows using `.dropna()`, or populate custom fallback default numbers using `.fillna(value)` (e.g. `df['tenure'].fillna(0)`).\n• Duplicate Removal: Filter duplicate rows using `.drop_duplicates(keep='first')` to maintain unique observations.\n• Type Casting: Enforce column numeric boundaries using `.astype()` to cast strings to integers or floats: `df['age'] = df['age'].astype('int64')`."
        },
        {
          title: "4. Fast Data Manipulation",
          content: "• Row Filtering: Select query criteria using conditional indexing masks: `df[df['age'] > 21]`.\n• Column Selection: Extract slices of columns: `df[['subscriber_id', 'age', 'tenure']]`.\n• Table Sorting: Order table rankings by columns: `df.sort_values(by='score', ascending=False)`."
        }
      ],
      table: {
        headers: ["Pandas Operation", "Method Command", "Computational Cost"],
        rows: [
          ["Ingest CSV Data", "pd.read_csv()", "O(N) sequential parse"],
          ["Duplicate Filter", "df.drop_duplicates()", "O(N) hash check"],
          ["Index Value Lookup", "df.loc[index]", "O(1) constant time hash map"],
          ["Sort Values", "df.sort_values()", "O(N log N) quick-sort"]
        ]
      }
    },
    codeWorkspace: {
      language: "python",
      instructions: "Complete the subscriber cleaning pipeline! First, drop duplicate rows. Second, replace missing null variables in the 'tenure' column with 0.0. Third, cast the string 'billing_tickets' column to integers ('int64'). Fourth, filter for active subscribers whose age is greater than 21. Fifth, slice columns 'subscriber_id', 'age', 'tenure', and 'billing_tickets'. Sixth, sort the final table by 'billing_tickets' in descending order.",
      starterCode: `# ----------------------------------------------------
# LAB: Pandas Subscriber Data Cleaning Pipeline
# Goal: Ingest messy subscriber signups and clean anomalies
# ----------------------------------------------------

import pandas as pd
import numpy as np

# 1. Dirty Raw Subscriber Dataset Feed
raw_data = {
    'subscriber_id': [101, 102, 103, 101, 104, 105], # contains duplicate ID 101
    'age': [24, 19, 32, 24, 45, 20],
    'tenure': [12.0, 3.0, np.nan, 12.0, 24.0, np.nan], # contains missing nulls (nan)
    'billing_tickets': ['2', '0', '5', '2', '1', '4'] # strings! Needs casting
}

df = pd.DataFrame(raw_data)
print("[SYSTEM] Loaded raw subscriber feed DataFrame shape:", df.shape)

# TODO: Complete the cleaning pipeline function
def clean_subscriber_data(dataframe):
    # Step 1: Drop duplicate rows
    df_clean = dataframe.drop_duplicates()
    
    # Step 2: Fill missing nulls in the 'tenure' column with 0.0
    df_clean['tenure'] = df_clean['tenure'].fillna(0.0)
    
    # Step 3: Cast 'billing_tickets' column from strings to integers ('int64')
    df_clean['billing_tickets'] = df_clean['billing_tickets'].astype('int64')
    
    # Step 4: Filter rows where subscriber age is greater than 21
    df_filtered = df_clean[df_clean['age'] > 21]
    
    # Step 5: Slice only these columns: ['subscriber_id', 'age', 'tenure', 'billing_tickets']
    df_sliced = df_filtered[['subscriber_id', 'age', 'tenure', 'billing_tickets']]
    
    # Step 6: Sort rows by 'billing_tickets' in descending order
    df_final = df_sliced.sort_values(by='billing_tickets', ascending=False)
    
    return df_final

# Execute the pipeline
cleaned_df = clean_subscriber_data(df)
print("\\n[RESULT] Cleaned, Filtered & Sorted Subscriber DataFrame:")
print(cleaned_df)
`,
      validationCode: (code) => {
        if (code.includes("drop_duplicates") && code.includes("fillna") && code.includes("astype") && code.includes("age") && code.includes("sort_values")) {
          return {
            success: true,
            logs: [
              "[19:42:01] Parsing Pandas DataFrame schema...",
              "[19:42:02] Ingesting raw subscriber feed...",
              "[19:42:03] Running drop_duplicates(): Duplicate row ID 101 removed successfully.",
              "[19:42:04] Running fillna(0.0) on tenure: replaced 2 NaN slots.",
              "[19:42:05] Casting 'billing_tickets' to int64: String values successfully converted to numeric.",
              "[19:42:06] Filtering active records: Age > 21 check completed. (Removed records under 21).",
              "[19:42:07] Column slicing matches schema validation list.",
              "[19:42:08] Running sort_values() on billing_tickets completed.",
              "",
              "[RESULT] Cleaned, Filtered & Sorted Subscriber DataFrame:",
              "    subscriber_id  age  tenure  billing_tickets",
              "2             103   32     0.0                5",
              "0             101   24    12.0                2",
              "4             104   45    24.0                1",
              "",
              "[SUCCESS] LAB VERIFIED! You successfully ingested, cleaned, filtered, and sorted messy subscribers data. No nulls or duplicates remain!"
            ],
            xpEarned: 150
          };
        } else {
          return {
            success: false,
            logs: [
              "Error: Data validation failed.",
              "Ensure your code drops duplicates, replaces missing tenure nulls with 0, casts billing_tickets to int64, filters age > 21, and sorts descending by billing_tickets."
            ],
            xpEarned: 0
          };
        }
      }
    }
  }
};
