import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Award, 
  Calendar, 
  Code, 
  Terminal, 
  Play, 
  CheckCircle2, 
  Lock, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Trophy, 
  Sliders, 
  Sparkles, 
  HelpCircle, 
  Send, 
  RotateCcw, 
  Briefcase, 
  TrendingUp, 
  Activity,
  ArrowRight,
  UserCheck,
  CheckCircle,
  FileText,
  Users,
  MessageSquare,
  Share2,
  Globe,
  CalendarRange,
  ThumbsUp,
  Check,
  PlusCircle,
  MessageCircle,
  UserPlus,
  MapPin,
  Clock
} from 'lucide-react';
import { rolesData, labsData } from './data/rolesData';

// Static Javatpoint Mock Articles Database for quick study reads
const javatpointArticles = {
  "python-basics-syntax": {
    title: "Python Basic Syntax & Foundations (GeeksforGeeks Edition)",
    intro: "Learn Python's foundation blocks. Understand dynamically-typed variables, core primitive types, math equations, comparison evaluations, and logical truth conditions.",
    sections: [
      {
        title: "1. Variables & Primary Data Types (int, float, str, bool)",
        content: "• Variables Overview:\n  - Theory: Python utilizes dynamic typing (types are inferred at runtime). Variables are instantly declared on assignment using the '=' operator.\n  - Example:\n    x = 42\n\n• Integers & Floats:\n  - Theory: 'int' holds positive/negative whole numbers (e.g., 50). 'float' represents decimal accuracy (e.g., 0.045) crucial for metrics and ratios.\n  - Example:\n    age = 25  # int\n    learning_rate = 0.01  # float\n\n• Strings (Text Blocks):\n  - Theory: Immutable sequences of Unicode text defined using single, double, or triple quotes.\n  - Example:\n    username = 'mgore'  # str\n    description = \"\"\"Multi-line text\n    representing a paragraph.\"\"\"\n\n• Booleans (Logical States):\n  - Theory: Logical binary values represented exclusively as capitalized True or False.\n  - Example:\n    is_enrolled = True  # bool"
      },
      {
        title: "2. Mathematical, Comparison & Logical Operators",
        content: "• Math Equations:\n  - Theory: Run calculations using standard symbols: addition (+), subtraction (-), multiplication (*), division (/), modulo for remainders (%), exponentiation for powers (**), and floor division (//).\n  - Example:\n    sum_val = 10 + 5\n    power_val = 2 ** 3  # 8\n\n• Comparison Steps:\n  - Theory: Inspect relationships between values, returning booleans: equal (==), not equal (!=), greater (>), less (<), greater-equal (>=), less-equal (<=).\n  - Example:\n    is_greater = 10 > 5  # True\n    is_equal = (4 == 5)  # False\n\n• Logical Truth Testing:\n  - Theory: Combine multiple comparisons using logical operators: 'and' (both True), 'or' (at least one True), and 'not' (inverts truth value).\n  - Example:\n    is_valid = (10 > 5) and not (3 == 4)"
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "In telemetry pipelines, incoming sensor payloads must be parsed and checked for safety limits:\n\n# Raw inputs from sensor A\nsensor_active = True  # bool\ntemp_celsius = 37.8  # float\nmax_threshold = 40.0  # float\n\n# Check if anomaly exists using logic operators\nis_overheating = sensor_active and (temp_celsius > max_threshold)\nprint(f\"Sensor alert status: {is_overheating}\")"
      }
    ],
    qa: [
      { q: "What is the difference between dynamic typing and static typing?", a: "Dynamic typing determines variable types at runtime automatically based on the assigned value. Static typing requires declaring variable types explicitly in source code before execution." }
    ],
    youtube: "https://www.youtube.com/watch?v=rfscVS0vtbw"
  },
  "python-control-flow-loops": {
    title: "Python Control Flow & Loops (GeeksforGeeks Edition)",
    intro: "Control execution tracks in your code. Guide decisions using if-elif-else branches, and execute repeating loops (for, while) with exact control switches.",
    sections: [
      {
        title: "1. Conditional Decision Checks (if-elif-else)",
        content: "• The 'if' Branch:\n  - Theory: Evaluates a primary conditional statement. If it resolves to True, the indented block of code is run.\n  - Example:\n    if temp > 30:\n        print(\"Hot\")\n\n• The 'elif' Choice:\n  - Theory: Evaluates a secondary check if all preceding statements evaluated to False. Prevents nested complexity.\n  - Example:\n    elif temp > 15:\n        print(\"Warm\")\n\n• The 'else' Fallback:\n  - Theory: The default backup block that triggers if all other conditions resolve to False.\n  - Example:\n    else:\n        print(\"Cold\")"
      },
      {
        title: "2. Sequence Iteration & Loops (for, while, breaks)",
        content: "• 'for' Sequence Loops:\n  - Theory: Iterates through elements in an iterable collection (like lists, strings, or ranges).\n  - Example:\n    for epoch in range(1, 4):\n        print(f\"Epoch: {epoch}\")\n\n• 'while' Conditional Loops:\n  - Theory: Repeats code execution as long as a designated condition remains True. Must update state to avoid infinite loops.\n  - Example:\n    count = 1\n    while count < 3:\n        print(count)\n        count += 1\n\n• Loop Control (break & continue):\n  - Theory: 'break' terminates the loop immediately. 'continue' skips the remainder of the current iteration and jumps to the next cycle.\n  - Example:\n    for val in range(10):\n        if val == 3:\n            continue # skip 3\n        if val == 5:\n            break # exit loop at 5"
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "During machine learning training, an epoch loop monitors validation loss. If the loss converges, it triggers early stopping using control breaks:\n\nmin_loss = 0.05\nfor epoch in range(1, 100):\n    # Simulated validation loss\n    val_loss = 0.1 - (epoch * 0.01)\n    if val_loss <= min_loss:\n        print(f\"Target reached at epoch {epoch}! Stopping loop.\")\n        break"
      }
    ],
    qa: [
      { q: "Why must loops have updates or control breaks in their blocks?", a: "Without a changing state condition or an explicit break statement, loops would run infinitely, consuming all CPU resources and hanging the application." }
    ],
    youtube: "https://www.youtube.com/watch?v=8aGhZQkoFbQ"
  },
  "python-functions-core": {
    title: "Python Functions & Scope Dynamics (GeeksforGeeks Edition)",
    intro: "Structure your programs into clean, modular components. Learn function declarations, argument configurations, and outputs return values.",
    sections: [
      {
        title: "1. Function Definition & Parameter Inputs (def keyword)",
        content: "• Function Signatures:\n  - Theory: Declared using the 'def' keyword followed by a unique function name and parentheses enclosing arguments.\n  - Example:\n    def calculate_tax(amount):\n        return amount * 0.15\n\n• Input Parameters & Default Fallbacks:\n  - Theory: Variables passed into the function. Supports positional arguments, keyword arguments, and default fallbacks.\n  - Example:\n    def train_model(epochs, learning_rate=0.01):\n        return f\"Trained {epochs} epochs with LR {learning_rate}\"\n    # Can call with default value:\n    train_model(epochs=10)\n    # Or override the default:\n    train_model(10, 0.05)"
      },
      {
        title: "2. Output Return Values",
        content: "• Returning Results:\n  - Theory: The 'return' keyword outputs calculated values back to the caller and exits the function block. If omitted, it defaults to returning None.\n  - Example:\n    def square(x):\n        return x * x\n\n• Multi-Value Returns (Tuple Packing):\n  - Theory: Return multiple values separated by commas. Python automatically packs them into a single immutable Tuple.\n  - Example:\n    def get_metrics():\n        loss = 0.23\n        accuracy = 0.94\n        return loss, accuracy  # returns (0.23, 0.94)\n    \n    # Unpacking returns:\n    l, acc = get_metrics()"
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Building modular vision scaling utilities inside preprocessing scripts:\n\ndef scale_image(img_path, target_size=(224, 224), normalize=True):\n    print(f\"Scaling {img_path} to {target_size}...\")\n    scaled_status = True\n    return scaled_status, f\"Image normalized successfully\"\n\n# Execute function\nstatus, msg = scale_image(\"profile.jpg\", target_size=(128, 128))"
      }
    ],
    qa: [
      { q: "What does it mean that Python arguments are passed by object reference?", a: "If you pass a mutable object (like a list) into a function, changes inside the function mutate the original object. Immutable objects (like integers or strings) cannot be mutated." }
    ],
    youtube: "https://www.youtube.com/watch?v=ZDa-Z5JzLYM"
  },
  "python-data-structures": {
    title: "Python Core Data Structures (GeeksforGeeks Edition)",
    intro: "Master collection structures. Understand the key architectural differences between Lists, Dictionaries, Tuples, and Sets.",
    sections: [
      {
        title: "1. Lists: Mutable, Indexable Sequences",
        content: "• Lists Overview:\n  - Theory: Ordered, mutable sequences defined with square brackets. Duplicates are allowed.\n  - Example:\n    items = [\"a\", \"b\", \"c\"]\n\n• Indexing items:\n  - Theory: Access items via 0-based index integers. Negative indices count from the end.\n  - Example:\n    first = items[0]  # \"a\"\n    last = items[-1]  # \"c\"\n\n• Slicing ranges:\n  - Theory: Extract sub-ranges using 'list[start:stop:step]'. The stop coordinate is non-inclusive.\n  - Example:\n    sub = items[0:2]  # [\"a\", \"b\"]\n\n• Appending elements:\n  - Theory: Grow lists dynamically using '.append(value)' in O(1) amortized time.\n  - Example:\n    items.append(\"d\")  # [\"a\", \"b\", \"c\", \"d\"]"
      },
      {
        title: "2. Dictionaries: High-Speed Key-Value Mappings",
        content: "• Dictionaries Overview:\n  - Theory: Unordered, mutable collections mapping unique keys to values. Powered by internal hash tables, offering constant-time O(1) performance.\n  - Example:\n    config = {\"lr\": 0.01, \"epochs\": 50}\n\n• Key-Value Mappings & Lookups:\n  - Theory: Extract values via brackets or using the safe '.get()' method to avoid exceptions if keys are absent.\n  - Example:\n    rate = config[\"lr\"]  # 0.01\n    dropout = config.get(\"dropout\", 0.5)  # returns fallback 0.5\n\n• Dictionary updates:\n  - Theory: Insert new pairs or alter existing records instantly using assignment selectors.\n  - Example:\n    config[\"lr\"] = 0.02\n    config[\"batch_size\"] = 32"
      },
      {
        title: "3. Tuples & Sets: Immutable sequences and Unique Math",
        content: "• Tuples (Fixed Sequences & Immutable Protection):\n  - Theory: Ordered, immutable sequences defined with parentheses. Once instantiated, they cannot be modified, protecting constant shapes and configurations from leakage.\n  - Example:\n    dimensions = (1920, 1080)  # Cannot append or alter elements\n\n• Data Packing & Unpacking:\n  - Theory: Easily pack coordinates and unpack them directly into distinct variables.\n  - Example:\n    w, h = dimensions\n\n• Sets (Unique Items & Set Math):\n  - Theory: Unordered collections of unique items. Automatically purges duplicate values.\n  - Example:\n    colors = {\"red\", \"blue\", \"red\"}  # results in {\"red\", \"blue\"}\n\n• Duplicate Removal & Set Math:\n  - Theory: Performs high-speed set operations: Union (|), Intersection (&), and Difference (-).\n  - Example:\n    set_a = {1, 2, 3}\n    set_b = {3, 4, 5}\n    overlap = set_a & set_b  # {3}"
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Parsing a raw log feed into distinct datasets:\n\n# Input logs containing redundant entries\nraw_logins = [\"alice\", \"bob\", \"alice\", \"charlie\"]\n\n# Deduplicate unique usernames using a set\nunique_users = set(raw_logins)\n\n# Structure user configuration meta inside a dictionary with a shape tuple\nuser_registry = {\n    \"count\": len(unique_users),\n    \"active_users\": unique_users,\n    \"dimensions\": (len(raw_logins), len(unique_users))\n}"
      }
    ],
    qa: [
      { q: "Why is a lookup in a dictionary O(1) while a lookup in a list is O(N)?", a: "Dictionaries convert keys directly into memory addresses using a hash function, whereas lists must be scanned sequentially from first to last to find a match." }
    ],
    youtube: "https://www.youtube.com/watch?v=QUT1VHiLgI4"
  },
  "python-intermediate-core": {
    title: "Python Intermediate Concepts (GeeksforGeeks Edition)",
    intro: "Learn enterprise-grade concepts. Master text file handling, try-except error blocks, list comprehensions, standard library packages, pip packages, and virtual environments.",
    sections: [
      {
        title: "1. File Handling & Stream Integration",
        content: "• Reading Text:\n  - Theory: Open and parse text lines utilizing the 'with open()' context manager, which guarantees file system locks are released immediately upon block exit.\n  - Example:\n    with open(\"data.txt\", \"r\") as f:\n        content = f.read()\n\n• Writing Output & Appending Files:\n  - Theory: Mode 'w' overwrites target files completely. Mode 'a' appends text lines cleanly to the end of the existing file.\n  - Example:\n    with open(\"logs.txt\", \"w\") as f:\n        f.write(\"Initial line\\n\")\n    with open(\"logs.txt\", \"a\") as f:\n        f.write(\"Appended line\\n\")"
      },
      {
        title: "2. Exception Error Handling (try-except & Custom Errors)",
        content: "• Try-Except Testing Blocks:\n  - Theory: Wrap risky calculations inside a 'try' block, and capture runtime errors inside 'except' statements to avoid application crashes.\n  - Example:\n    try:\n        res = 10 / 0\n    except ZeroDivisionError as e:\n        print(f\"Handled division issue: {e}\")\n\n• Raising Custom Exceptions:\n  - Theory: Create descriptive domain-specific error classes by inheriting from the base 'Exception' class to enforce pipeline integrity.\n  - Example:\n    class DataCorruptedError(Exception): pass\n    \n    # Trigger exception:\n    raise DataCorruptedError(\"Inconsistent dimensions found\")"
      },
      {
        title: "3. Comprehensions (List, Dict, & Fast Generation)",
        content: "• List Comprehensions:\n  - Theory: Compact, expressive, and optimized syntax to instantiate transformed lists in a single loop line.\n  - Example:\n    squares = [x**2 for x in range(1, 6)]  # [1, 4, 9, 16, 25]\n\n• Dictionary Comprehensions & Compression:\n  - Theory: Generates lookups instantly mapping keys directly to calculations.\n  - Example:\n    squares_dict = {x: x**2 for x in range(1, 4)}  # {1: 1, 2: 4, 3: 9}\n\n• Conditional Filters inside Comprehensions:\n  - Theory: Integrate 'if' statements to filter elements during generation.\n  - Example:\n    even_squares = [x**2 for x in range(10) if x % 2 == 0]"
      },
      {
        title: "4. Modules, Packages, Pip & Virtual Environments",
        content: "• Standard Library Imports:\n  - Theory: Import built-in utility packages (like os, sys, math, json, or datetime) to leverage pre-compiled C-speed modules.\n  - Example:\n    import os\n    import math\n    val = math.sqrt(64)  # 8.0\n\n• Pip Installer Tool & PyPI:\n  - Theory: Use 'pip install <package>' in the terminal to download third-party community packages from the Python Package Index.\n  - Example:\n    # Terminal command:\n    # pip install requests pandas openpyxl\n\n• Virtual Environments (venv):\n  - Theory: Isolate project setups. Creating a virtual environment ensures different projects do not suffer from conflicting library dependencies.\n  - Example:\n    # Terminal commands:\n    # python -m venv venv\n    # venv\\Scripts\\activate (Windows)"
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Ingesting configuration data safely with File and Error checks:\n\nimport json\nimport os\n\ndef load_config(path=\"config.json\"):\n    try:\n        if not os.path.exists(path):\n            raise FileNotFoundError(f\"Target {path} missing\")\n        with open(path, \"r\") as f:\n            return json.load(f)\n    except FileNotFoundError as e:\n        print(f\"Warning: {e}. Loading defaults.\")\n        return {\"learning_rate\": 0.01, \"batch\": 32}\n\nconfig = load_config()"
      }
    ],
    qa: [
      { q: "Why should we avoid generic exceptions like 'except Exception:' in production?", a: "Generic exceptions catch all errors (including coding syntax typos or system signals), making it extremely difficult to isolate bugs and debug code paths." }
    ],
    youtube: "https://www.youtube.com/watch?v=vmEHCJof1kU"
  },
  "python-specialized-oop": {
    title: "Python Object-Oriented Specialist (GeeksforGeeks Edition)",
    intro: "Learn to design modular, scalable backend frameworks. Master classes, object instances, constructor scopes, encapsulation, and code inheritance models.",
    sections: [
      {
        title: "1. Class Templates & Constructor Scopes",
        content: "• Classes (Templates & Blueprints):\n  - Theory: A class is a custom blueprint that clusters data attributes and functional behaviors into a unified package.\n  - Example:\n    class ModelParameters:\n        pass\n\n• Constructors & Attributes (the __init__ method):\n  - Theory: A magic constructor method that executes automatically upon object instantiation. It defines instance attributes using the 'self' pointer.\n  - Example:\n    class NeuralLayer:\n        def __init__(self, in_nodes, out_nodes):\n            self.in_nodes = in_nodes\n            self.out_nodes = out_nodes\n            self.weights = 0.05  # instance attribute"
      },
      {
        title: "2. Object Instantiation & Method Invocations",
        content: "• Instantiation (Creating Distinct Instances):\n  - Theory: Allocates unique memory space to construct a real object from the class template.\n  - Example:\n    layer1 = NeuralLayer(64, 32)\n    layer2 = NeuralLayer(32, 10)\n\n• Method Invocations:\n  - Theory: Calling standard methods defined inside classes. Methods always receive the calling instance pointer as their first parameter ('self').\n  - Example:\n    class NeuralLayer:\n        def __init__(self, in_nodes, out_nodes):\n            self.in_nodes = in_nodes\n            self.out_nodes = out_nodes\n        def compute_dims(self):\n            return self.in_nodes * self.out_nodes\n    \n    layer = NeuralLayer(10, 5)\n    size = layer.compute_dims()  # returns 50"
      },
      {
        title: "3. Class Inheritance & Method Overriding",
        content: "• Inheritance (Parent Class vs Child Class):\n  - Theory: Promotes reuse by allowing child classes to inherit attributes and methods from base parent classes.\n  - Example:\n    class Layer:\n        def __init__(self, name):\n            self.name = name\n        def show(self):\n            return f\"Layer: {self.name}\"\n            \n    class DenseLayer(Layer):  # inherits Layer\n        pass\n\n• Method Overriding:\n  - Theory: Child classes redefine inherited parent methods to implement specialized custom logic.\n  - Example:\n    class DenseLayer(Layer):\n        def __init__(self, name, units):\n            super().__init__(name)  # Invoke parent constructor\n            self.units = units\n        def show(self):  # Method Overriding\n            return f\"Dense Layer: {self.name} with {self.units} units\""
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Defining a deep learning neural layer registry inheritance hierarchy:\n\nclass Layer:\n    def forward(self, input_tensor):\n        raise NotImplementedError(\"Subclasses must implement forward!\")\n\nclass ActivationLayer(Layer):\n    def __init__(self, activation_type=\"ReLU\"):\n        self.type = activation_type\n    def forward(self, input_tensor):\n        print(f\"Applying {self.type} function...\")\n        return [max(0.0, x) for x in input_tensor]  # ReLU calculation\n\nact = ActivationLayer()\noutputs = act.forward([-1.5, 2.0, -0.4])"
      }
    ],
    qa: [
      { q: "What does the super() function accomplish in class methods?", a: "The 'super()' function returns a proxy object that delegates method calls to a parent class, allowing child constructors to execute base constructors cleanly." }
    ],
    youtube: "https://www.youtube.com/watch?v=VMj-3S1tku0"
  },
  "python-specialized-data": {
    title: "Specialized Path: Core Data Science Frameworks (GeeksforGeeks Edition)",
    intro: "Step into numerical AI pipelines. Leverage NumPy for vectorized calculations, Pandas for tabular data structures, and Matplotlib for analytical charts.",
    sections: [
      {
        title: "1. NumPy Vectorized Computing & Dimensions",
        content: "• Multi-Dimensional Arrays (ndarray):\n  - Theory: Replaces slow Python loops with highly optimized, contiguous blocks of C memory.\n  - Example:\n    import numpy as np\n    arr_1d = np.array([1, 2, 3])\n\n• Array Shapes & Dimensions:\n  - Theory: Track dimensions via '.shape' and re-structure matrices instantly without copying underlying data via '.reshape()'.\n  - Example:\n    matrix = np.arange(12).reshape(3, 4)  # 3 rows, 4 columns\n\n• Vector Math & Matrix Products:\n  - Theory: Perform instant element-wise matrix additions and calculate high-speed dot products via '@' or 'np.dot()'.\n  - Example:\n    a = np.array([1, 2])\n    b = np.array([3, 4])\n    product = np.dot(a, b)  # 11"
      },
      {
        title: "2. Pandas Data Wrangling & Spreadsheets",
        content: "• DataFrames & Structuring:\n  - Theory: Tabular two-dimensional spreadsheets where columns represent Series and rows share unique indices.\n  - Example:\n    import pandas as pd\n    df = pd.DataFrame({\"A\": [1, 2], \"B\": [3, 4]})\n\n• Ingestion, Grouping & Filtering:\n  - Theory: Parse files, perform boolean filters, group categories via '.groupby()', and run statisticalaggregates.\n  - Example:\n    # Ingest: df = pd.read_csv('dataset.csv')\n    # Group: df.groupby('category').mean()"
      },
      {
        title: "3. Matplotlib Visualizations & Accuracies",
        content: "• Charting Plots:\n  - Theory: Render graphical charts to track training loss, validation accuracy curves, and data boundaries.\n  - Example:\n    # import matplotlib.pyplot as plt\n    # plt.plot([1, 2, 3], [10, 20, 30])\n    # plt.title('Accuracy Curve')\n    # plt.show()"
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Ingesting, parsing, cleaning, and vectorizing server metrics:\n\n# import pandas as pd\n# import numpy as np\n\n# Ingest CSV file\n# df = pd.read_csv('server.csv')\n# df['cpu'].fillna(df['cpu'].median(), inplace=True)\n\n# Extract columns as numerical arrays for model inference\n# inputs = df[['cpu', 'memory']].to_numpy()\n# print(\"Matrix loaded into model pipeline. Shape:\", inputs.shape)"
      }
    ],
    qa: [
      { q: "Why are NumPy array operations faster than Python lists?", a: "NumPy arrays utilize homogeneous memory layouts and execute calculations via compiled C code using SIMD hardware vectorization, bypassing dynamic type inspections." }
    ],
    youtube: "https://www.youtube.com/watch?v=wjZofJX0v4M"
  },
  "python-specialized-web": {
    title: "Specialized Path: Web Frameworks & REST APIs (GeeksforGeeks Edition)",
    intro: "Deploy your machine learning models to the internet. Master Flask routing, Django architectures, and backend JSON REST API serving.",
    sections: [
      {
        title: "1. Flask Routing & App Setup",
        content: "• Flask App Configurations:\n  - Theory: Minimalist microservice framework designed for fast, low-overhead deployments.\n  - Example:\n    # from flask import Flask\n    # app = Flask(__name__)\n\n• Route Definition & App Listening:\n  - Theory: Set up URL endpoint listeners using decorator routing syntax (e.g., '@app.route()').\n  - Example:\n    # @app.route('/status')\n    # def status(): return {\"status\": \"active\"}"
      },
      {
        title: "2. Django MVC Architecture & Relational ORMs",
        content: "• Full-Stack Django Structure:\n  - Theory: Heavyweight, fully secured MVC (Model-View-Template) web framework containing built-in admin configurations.\n  - Example:\n    # django-admin startproject config\n\n• Relational ORM Models:\n  - Theory: Map database schemas directly to Python class objects without writing raw SQL scripts.\n  - Example:\n    # class UserProfile(models.Model):\n    #     username = models.CharField(max_width=100)"
      },
      {
        title: "3. Serving REST APIs & JSON Responses",
        content: "• Web Ingestion & Outputs:\n  - Theory: Exposing web APIs to accept incoming POST request JSON inputs, run prediction loops, and return JSON responses.\n  - Example:\n    # from flask import request, jsonify\n    # @app.route('/predict', methods=['POST'])\n    # def predict():\n    #     data = request.get_json()\n    #     return jsonify({\"prediction\": 1.0})"
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Creating a complete mock microservice class endpoint in Flask:\n\n# from flask import Flask, jsonify, request\n# app = Flask(__name__)\n\n# @app.route('/predict', methods=['POST'])\n# def run_inference():\n#     payload = request.get_json() or {}\n#     input_val = payload.get('value', 0)\n#     return jsonify({\"prediction\": input_val * 2.5, \"status\": \"success\"})\n\n# if __name__ == '__main__':\n#     app.run(port=5000)"
      }
    ],
    qa: [
      { q: "When should you choose Flask over Django?", a: "Choose Flask for lightweight model endpoints, microservices, and rapid API prototyping. Choose Django for heavy portals requiring built-in SQL databases, user auth, and admin tools." }
    ],
    youtube: "https://www.youtube.com/watch?v=KLlvPL4s1TY"
  },
  "python-specialized-automation": {
    title: "Specialized Path: Automation, Scraping & OS Scripting (GeeksforGeeks Edition)",
    intro: "Automate administrative routines. Build BeautifulSoup web scrapers to gather datasets, schedule cron tasks, and script OS folder paths.",
    sections: [
      {
        title: "1. Web Scraping & BeautifulSoup",
        content: "• Requests Ingestions:\n  - Theory: Fetch source code from public HTML pages using requests pipelines.\n  - Example:\n    # import requests\n    # res = requests.get('https://news.ycombinator.com')\n\n• DOM Parsing (BeautifulSoup):\n  - Theory: Parse HTML tree nodes and search elements by tags, classes, or attributes.\n  - Example:\n    # from bs4 import BeautifulSoup\n    # soup = BeautifulSoup(res.text, 'html.parser')\n    # headings = soup.find_all('span', class_='titleline')"
      },
      {
        title: "2. OS Module File System Scripts",
        content: "• Scanning Directories:\n  - Theory: Navigate folders, scan lists of files, and create/rename directories dynamically using built-in system hooks.\n  - Example:\n    import os\n    files = os.listdir(\".\")\n\n• Creating Directories & Path Management:\n  - Theory: Check path existences and create folders recursively using 'os.makedirs()'.\n  - Example:\n    if not os.path.exists(\"archives\"):\n        os.makedirs(\"archives\")"
      },
      {
        title: "3. Scheduled Automation Tasks (Cron & Loops)",
        content: "• Scheduled Cron Scripts:\n  - Theory: Set up automated background tasks using scheduling libraries or operating system crontabs to run scripts daily or hourly.\n  - Example:\n    # import schedule\n    # import time\n    # def job(): print(\"Archiving files...\")\n    # schedule.every().day.at(\"02:00\").do(job)\n    # while True:\n    #     schedule.run_pending()\n    #     time.sleep(1)"
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "An automated scheduled script that scans a directory, archives files, and logs statuses:\n\nimport os\nfrom datetime import datetime\n\ndef archive_logs():\n    src_file = \"logs.txt\"\n    archive_folder = \"archives\"\n    \n    if os.path.exists(src_file):\n        if not os.path.exists(archive_folder):\n            os.makedirs(archive_folder)\n        timestamp = datetime.now().strftime(\"%Y%m%d_%H%M%S\")\n        os.rename(src_file, f\"{archive_folder}/log_{timestamp}.txt\")\n        print(\"Log archived successfully!\")\n\narchive_logs()"
      }
    ],
    qa: [
      { q: "How do you handle rate-limits and blocks while scraping?", a: "Inject mock browser headers ('User-Agent'), respect robots.txt rules, configure random delays between requests, and utilize rotating IP proxy services." }
    ],
    youtube: "https://www.youtube.com/watch?v=FBE1M1K695A"
  },
  "numpy-foundations-core": {
    title: "NumPy Foundations & Vector Calculations",
    intro: "Step into deep numerical computing. Master NumPy Array Basics, Indexing, Vector Math, and high-performance Statistical Methods powering modern deep neural networks.",
    sections: [
      {
        title: "1. Array Basics & Dimensions",
        content: "• Creating Arrays: Initialize contiguous blocks using list arrays (`np.array([1, 2, 3])`), default zeros (`np.zeros((3, 3))`), ones (`np.ones((4, 2))`), or numerical ranges (`np.arange(0, 10)`).\n• Array Shapes: Track matrix dimensions with `.shape` (returns size tuples) and re-structure dimensions without moving data using `.reshape(rows, cols)`.\n• Data Types: Configure numeric limits explicitly utilizing `dtype` attributes (e.g., `dtype=np.float32` for neural activations or `dtype=np.int64` for indexing labels)."
      },
      {
        title: "2. High-Speed Indexing & Slicing",
        content: "• Target Elements: Retrieve specific cells using row-column tuples: `arr[row, col]` (e.g., `arr[0, 2]`).\n• Range Slicing: Extract sub-matrices utilizing the slicing colon: `arr[start:stop:step]` (e.g., `arr[0:2, 1:3]` extracts a 2x2 sub-block).\n• Boolean Masking: Query indices conditionally. Evaluating a comparison returns a boolean matrix (e.g., `mask = arr > 0.5`), which filters matching items directly: `arr[arr > 0.5]`."
      },
      {
        title: "3. Vector Math & Statistical Methods",
        content: "• Math Operations: Run element-wise vector additions (`A + B`) and scalar multiplications (`A * 0.1`) instantly in contigous C memory. Compute matrix products using `np.dot(A, B)` or the `@` operator.\n• Statistical Methods: Track matrix profiles using fast aggregations: `np.mean(arr, axis=0)` (calculates mean columns), `np.median(arr)` (tracks structural centers), and `np.std(arr)` (standard deviation variance)."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Recommendation models analyze product descriptions. Embeddings are stored as NumPy arrays. By applying dot products between customer interest vectors and item tags, the system calculates scores instantly, filtering anomalies using boolean masks: `items[scores > threshold]`."
      }
    ],
    qa: [
      { q: "Why is boolean masking faster than iterating list indices conditionally?", a: "Boolean masking delegates iteration to compiled C loops inside NumPy, aligning memory in CPU cache lines and avoiding heavy Python bytecode execution." }
    ],
    youtube: "https://www.youtube.com/watch?v=QUT1VHiLgI4"
  },
  "pandas-foundations-core": {
    title: "Pandas Foundations & Data Cleaning",
    intro: "Ingest, clean, and manipulate structured datasets. Master core objects (Series, DataFrames, Index labels), ingest formats (CSV, Excel, JSON), sanitization steps (null values, duplicates, type casting), and basic row-column operations.",
    sections: [
      {
        title: "1. Core Objects (Series, DataFrames, Index Labels)",
        content: "• Series Columns:\n  - Theory: A 1D labeled array capable of holding any data type. It represents a single column in a spreadsheet.\n  - Points: Data is homogeneous (same type); supports dynamic index alignments; behaves like a vector.\n  - Example:\n    import pandas as pd\n    s = pd.Series([12000, 15300, 18900], index=['Jan', 'Feb', 'Mar'], name='MAU')\n\n• DataFrame Tables:\n  - Theory: A 2D mutable tabular structure with labeled rows and columns (a dict of Series sharing an index).\n  - Points: Heterogeneous columns; dual axes (rows = axis 0, columns = axis 1); database-like operations.\n  - Example:\n    df = pd.DataFrame({'Name': ['Alice', 'Bob'], 'GPA': [3.85, 3.42]})\n\n• Index Labels:\n  - Theory: High-speed, immutable sequences acting as row coordinates/keys for fast lookup and axis alignment.\n  - Points: Provides O(1) alignment; immutable hash-map structure; allows non-unique IDs but unique is preferred.\n  - Example:\n    df_countries = df.set_index('Country')"
      },
      {
        title: "2. Data Ingestion (CSV, Excel, JSON)",
        content: "• CSV Ingestion:\n  - Theory: Reads plain-text files separated by delimiters. Highly optimized parser mapping files to rows.\n  - Points: Uses 'pd.read_csv()'; custom delim via 'sep='; limit columns via 'usecols'; supports chunking.\n  - Example:\n    df = pd.read_csv('logs.csv', parse_dates=['timestamp'])\n\n• Excel Reading:\n  - Theory: Integrates standard workbook engines (openpyxl) to read spreadsheets, cells, sheets, and formulas.\n  - Points: Uses 'pd.read_excel()'; sheet selection via 'sheet_name='; custom nulls definition.\n  - Example:\n    df = pd.read_excel('sales.xlsx', sheet_name='Q1_Data')\n\n• JSON Parsing:\n  - Theory: Unpacks nested hierarchical configurations into 2D tables based on document layouts.\n  - Points: Uses 'pd.read_json()'; dynamic parsing orientation configured via 'orient=' ('records', 'split').\n  - Example:\n    df = pd.read_json('api.json', orient='records')"
      },
      {
        title: "3. Data Cleaning & Sanitizing (NaN, Duplicates, Casting)",
        content: "• Missing Values (NaN):\n  - Theory: Represents missing numeric/categorical indices in rows. Requires detection or population.\n  - Points: Detect with '.isna()'; discard rows with '.dropna()'; fill defaults with '.fillna(value)'.\n  - Example:\n    df['Price'] = df['Price'].fillna(df['Price'].median())\n\n• Duplicate Removal:\n  - Theory: Eliminates repeating rows to prevent data leakage and mathematical skewing.\n  - Points: Detect duplicates via '.duplicated()'; drop rows via '.drop_duplicates(keep=\"first\")'.\n  - Example:\n    df_clean = df.drop_duplicates(subset=['Tx_ID'], keep='first')\n\n• Type Casting:\n  - Theory: Converts column data types explicitly to match standard numeric/categorical representations.\n  - Points: Cast using '.astype()'; coerce errors using 'pd.to_numeric(errors=\"coerce\")'.\n  - Example:\n    df['Quantity'] = df['Quantity'].astype('int32')"
      },
      {
        title: "4. Data Manipulation (Filtering, Selection, Sorting)",
        content: "• Row Filtering:\n  - Theory: Extracts subsets of records meeting logical query criteria using boolean conditions.\n  - Points: Filter with 'df[df[\"col\"] > 100]'; query with '.query()'; use '&' (AND), '|' (OR), '~' (NOT).\n  - Example:\n    df_it = df[(df[\"Dept\"] == \"IT\") & (df[\"Salary\"] > 80000)]\n\n• Column Selection:\n  - Theory: Focuses on specific feature subsets to save system memory and isolate columns.\n  - Points: Extract Series via 'df[\"col\"]'; extract DataFrame via 'df[[\"col1\", \"col2\"]]'; use '.loc' or '.iloc'.\n  - Example:\n    features = df[['temp', 'humidity']]\n\n• Table Sorting:\n  - Theory: Rearranges spreadsheet row sequences to rank elements or display in chronological order.\n  - Points: Sort with '.sort_values(by=\"col\")'; sort row coordinates via '.sort_index()'; toggle 'ascending='.\n  - Example:\n    df_sorted = df.sort_values(by=['Score', 'Age'], ascending=[False, True])"
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "During daily transaction processing, log datasets contain redundant telemetry packets and empty coordinates. A robust Pandas ETL pipeline:\n1. Ingests raw JSON web service payloads: 'df = pd.read_json(api_stream, orient=\"records\")'.\n2. Purges duplicate event records: 'df.drop_duplicates(subset=[\"Tx_Hash\"], inplace=True)'.\n3. Populates missing price averages with the median: 'df[\"Price\"].fillna(df[\"Price\"].median(), inplace=True)'.\n4. Casts quantity string columns to proper integer units: 'df[\"Quantity\"] = df[\"Quantity\"].astype(\"int32\")'.\n5. Filters columns, retaining high-value rows, sorted by latency: 'df[df[\"Amount\"] > 5000].sort_values(by=\"Latency\")'."
      }
    ],
    qa: [
      { q: "What is the difference between an index and a typical data column in a DataFrame?", a: "An index acts as the row key identifier, enabling constant time O(1) alignment and fast binary search lookups, whereas standard columns represent features scanned linearly." }
    ],
    youtube: "https://www.youtube.com/watch?v=vmEHCJof1kU"
  },
  "pandas-advanced-manipulation": {
    title: "Advanced Data Manipulation, Merges & Time Series",
    intro: "Unlock enterprise analytics. Master GroupBy aggregations, relational merging joins, and statistical time series rolling windows.",
    sections: [
      {
        title: "1. Grouping & Custom Aggregations",
        content: "• GroupBy Splitting: Partition rows based on column categories: `grouped = df.groupby('department')`.\n• Summary Statistics: Extract profile metrics: `grouped.mean()` or `grouped.describe()`.\n• Custom Aggregations: Run granular combinations via `.agg()` (e.g., `df.groupby('dept').agg({'salary': ['sum', 'mean', lambda x: x.max() - x.min()]})`)."
      },
      {
        title: "2. Merging & Concatenation",
        content: "• Inner Joins: Combine tables sharing keys, discarding unmatched rows: `pd.merge(A, B, how='inner', on='id')`.\n• Outer Joins: Combine tables keeping all keys, inserting nulls for missing values: `pd.merge(A, B, how='outer', on='id')`.\n• Concatenation: Stitches tables along axes: `pd.concat([A, B], axis=0)` (vertical stack) or `axis=1` (horizontal side-by-side)."
      },
      {
        title: "3. Time Series Analytics",
        content: "• Date Parsing: Translate string dates into standard timestamps: `pd.to_datetime(df['timestamp'])`.\n• Resampling Frequencies: Aggregate chronological profiles: `df.resample('M', on='date').mean()` (groups metrics by month).\n• Window Rolling: Smooth random noise and calculate running bounds: `df['sales'].rolling(window=7).mean()` (7-day moving average)."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Server monitor engines capture server payloads sequentially. Pandas parses the string dates, groups requests by service to count average latency using `.groupby()`, and computes a 10-minute rolling average to plot anomalies."
      }
    ],
    qa: [
      { q: "Why is resampling critical in chronological data workflows?", a: "It standardizes irregular logs into unified intervals (e.g. converting random transaction timestamps into hourly or monthly averages), aligning features for machine learning models." }
    ],
    youtube: "https://www.youtube.com/watch?v=rfscVS0vtbw"
  },
  "pytorch-backpropagation": {
    title: "PyTorch: Deep Networks & Backpropagation Optimization",
    intro: "PyTorch is the leading deep learning framework. It uses a dynamic computation graph to calculate gradients automatically during model training.",
    sections: [
      {
        title: "1. Tensors & Dynamic Graphs",
        content: "Tensors are multi-dimensional matrices similar to NumPy arrays, but they can be loaded onto GPU cores to parallelize training. PyTorch builds a computational graph dynamically during the forward pass."
      },
      {
        title: "2. The Backpropagation Algorithm",
        content: "Calculates the derivative of the network's loss function with respect to its weights. The optimizer (e.g., SGD or Adam) uses these gradients to shift weights in the direction that minimizes loss."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Netflix predicts customer churn by passing user metrics through a PyTorch classifier. During training, the backpropagation loop calculates prediction errors and adjusts network weights, improving classification accuracy epoch by epoch."
      }
    ],
    qa: [
      { q: "What role does the learning rate play in backpropagation?", a: "The learning rate scales the gradient step. If it is too small, training is slow; if it is too large, the optimizer may overshoot the loss minimum, causing training to fail." }
    ],
    youtube: "https://www.youtube.com/watch?v=VMj-3S1tku0"
  },
  "transformers-tokenization": {
    title: "Transformers: Attention Weights & Tokenization Mechanics",
    intro: "Transformers are the core architecture behind state-of-the-art LLMs, replacing sequential RNN processing with parallelized attention weights.",
    sections: [
      {
        title: "1. The Self-Attention Mechanism",
        content: "Allows the model to focus on different parts of the input sequence when predicting a word. It computes Query (Q), Key (K), and Value (V) matrices to calculate relative attention weights."
      },
      {
        title: "2. Byte-Pair Encoding (BPE) Tokenization",
        content: "Translates characters into integer sequences. It splits text into sub-word tokens, balancing vocabulary size with sequence length efficiency."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Legal compliance models utilize Transformers to parse 200-page contracts. By analyzing self-attention weights, the model maps pronoun references back to entities across long paragraphs, highlighting liabilities."
      }
    ],
    qa: [
      { q: "Why did Transformers replace Recurrent Neural Networks (RNNs)?", a: "RNNs process tokens sequentially, which prevents parallel training. Transformers process the entire sequence at once, allowing them to train on vast datasets using modern GPU architectures." }
    ],
    youtube: "https://www.youtube.com/watch?v=wjZofJX0v4M"
  },
  "vector-search": {
    title: "Vector Databases & Dense Retrieval in RAG Pipelines",
    intro: "Vector databases index and store dense embedding arrays, enabling semantic search at enterprise scale under 15 milliseconds.",
    sections: [
      {
        title: "1. Dense Retrieval vs Keyword Match",
        content: "Keyword search (like SQL LIKE or Elasticsearch BM25) looks for exact word matches, failing on synonyms. Vector search matches the underlying meaning, mapping queries to coordinates close to semantically similar context chunks."
      },
      {
        title: "2. HNSW Indexes & Cosine Similarity",
        content: "To search millions of vectors quickly, databases build Hierarchical Navigable Small World (HNSW) graphs. Similarity is computed using Cosine Distance, which measures the angle between vectors independent of text length."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Customer service bots use vector databases to index thousands of product manuals. When a customer asks a question, the bot embeds the query and retrieves the most semantically relevant paragraphs to generate an accurate answer."
      }
    ],
    qa: [
      { q: "Why is Cosine Similarity preferred over Euclidean distance for embedding models?", a: "Euclidean distance is sensitive to vector magnitude (text length), whereas Cosine Similarity measures only the vector angle, focusing strictly on semantic meaning." }
    ],
    youtube: "https://www.youtube.com/watch?v=KLlvPL4s1TY"
  },
  "hybrid-reranking": {
    title: "Hybrid Search & Re-ranking for Production RAG",
    intro: "Hybrid search combines the strengths of keyword and vector search, using a re-ranker model to maximize retrieval accuracy.",
    sections: [
      {
        title: "1. Sparse + Dense Fusion",
        content: "Vector search excels at semantic matching, but can struggle with exact codes or serial numbers. Hybrid search runs both keyword (sparse) and vector (dense) queries, merging their results."
      },
      {
        title: "2. Cross-Encoder Re-rankers",
        content: "Bi-encoders calculate embeddings independently to speed up search. Once candidate documents are retrieved, a slower but highly accurate Cross-Encoder re-ranker evaluates the exact relationship between the query and each candidate, sorting them by relevance."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Medical search engines index clinical trials. They use hybrid search to match both symptoms (using vectors) and exact drug codes (using keywords). A re-ranker model then sorts the results, placing the most critical trials at the top."
      }
    ],
    qa: [
      { q: "Why is a re-ranker applied only to search results rather than the entire database?", a: "Cross-encoder calculations are computationally expensive. Applying them to the entire database is too slow for real-time search, so they are used to re-rank only the top 50 candidates retrieved by faster indexing models." }
    ],
    youtube: "https://www.youtube.com/watch?v=FBE1M1K695A"
  },
  "prompt-engineering-sandbox": {
    title: "Prompt Design: Reasoning Chains & Dynamic Parameter Optimization",
    intro: "Prompt Engineering balances natural language formatting with mathematical parameters to guide model generations.",
    sections: [
      {
        title: "1. Core Prompting Techniques",
        content: "• Zero-Shot: Prompting without examples.\n• Few-Shot: Injecting input-output examples inside the prompt to guide formatting.\n• Chain-of-Thought (CoT): Asking the model to state its reasoning step-by-step to improve logical accuracy."
      },
      {
        title: "2. Generation Parameters",
        content: "• Temperature: Controls output randomness.\n• Top-P (Nucleus): Restricts word selection to cumulative probability thresholds, ensuring consistency while maintaining fluid generation."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Automated billing review models process refund requests. By using Chain-of-Thought prompts and setting the temperature to 0, the model systematically evaluates order dates and categories against company policies, returning a highly consistent YES/NO verdict."
      }
    ],
    qa: [
      { q: "How does Chain-of-Thought prompting reduce logical errors in reasoning tasks?", a: "By forcing the model to generate intermediate steps, it allows the attention mechanism to build connections sequentially rather than trying to calculate the final answer immediately." }
    ],
    youtube: "https://www.youtube.com/watch?v=jC4v5AS4YSg"
  },
  "multi-agent-orchestrator": {
    title: "Multi-Agent Architectures: Building Collaborative AI Systems",
    intro: "Multi-Agent systems coordinate multiple specialized agents to break down and solve complex, multi-step tasks.",
    sections: [
      {
        title: "1. Specialized Agents & Tools",
        content: "Instead of using a single generalist prompt, multi-agent frameworks define specialized agent roles (e.g., Writer, Critic, Coder) equipped with specific tools (like search APIs or database connectors)."
      },
      {
        title: "2. Orchestration & State Management",
        content: "Orchestrators (like CrewAI or LangGraph) manage execution flows, enabling loops, feedback cycles, and state transitions between agents."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "E-commerce operations automate marketing audits. A Researcher agent gathers competitor pricing, a Copywriter agent drafts product descriptions, and a Critic agent reviews the content against brand safety policies, delivering a polished final campaign."
      }
    ],
    qa: [
      { q: "What is the primary benefit of multi-agent collaboration over standard prompt chaining?", a: "Multi-agent systems allow for complex, dynamic feedback loops and autonomous execution, letting agents inspect outputs, detect errors, and retry steps to improve results." }
    ],
    youtube: "https://www.youtube.com/watch?v=sPzc6hMg7yY"
  },
  "linear-algebra": {
    title: "Linear Algebra, Matrix Decompositions & Gradient Descent Optimization",
    intro: "Linear Algebra is the mathematical language of machine learning. From word embeddings to deep neural network weights, all data is represented as vectors and matrices, manipulated via high-dimensional transformations.",
    sections: [
      {
        title: "1. Vectors, Matrices & Eigen-Decomposition",
        content: "• Vectors & Matrices: Represent data points and transformations (e.g., y = Wx + b).\n• Eigenvalues & Eigenvectors: Solve Av = λv. They reveal the dominant directions of variance in data, powering algorithms like PCA (Principal Component Analysis)."
      },
      {
        title: "2. Singular Value Decomposition (SVD)",
        content: "SVD factors any real matrix into U Σ V^T. This is crucial for dimensionality reduction, text latent semantic analysis, and compressed model representations."
      },
      {
        title: "3. Gradient Descent Optimization",
        content: "• Mechanics: Computes the partial derivatives (gradients) of the loss function with respect to weights (∇L_W).\n• Shift: Updates weights in the opposite direction of the gradient to find the local minimum: W = W - α ∇L_W."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "In automated face recognition engines, SVD compresses 4K high-resolution security camera frames into low-dimensional 'Eigenfaces' vectors. This reduces memory footprint by 98% and allows matching algorithms to run on edge devices in under 5 milliseconds."
      }
    ],
    qa: [
      { q: "Why is Singular Value Decomposition (SVD) used in recommender systems?", a: "SVD decomposes sparse user-item rating matrices into dense latent vectors representing user tastes and item attributes, enabling highly accurate predictions of unseen ratings." }
    ],
    youtube: "https://www.youtube.com/watch?v=fNk_zzaMoEs"
  },
  "classical-ml": {
    title: "Supervised Learning: Classical Regression, SVMs & Tree Classifiers",
    intro: "Before applying deep neural networks, machine learning engineers deploy classical models. They are highly explainable, faster to train, and serve as the golden benchmark for tabular business data.",
    sections: [
      {
        title: "1. Linear & Logistic Regression",
        content: "• Linear Regression: Fits a continuous plane to predict numerical outcomes (e.g., house prices).\n• Logistic Regression: Applies the Sigmoid function 1 / (1 + e^-z) to map real-valued outputs into [0, 1] probability thresholds for binary classification."
      },
      {
        title: "2. Support Vector Machines (SVM)",
        content: "SVMs find the optimal hyperplane that maximizes the margin between two classes. The 'kernel trick' maps non-linear data into infinite-dimensional spaces to make it linearly separable."
      },
      {
        title: "3. Decision Trees & Ensemble Methods",
        content: "• Decision Trees: Split data recursively using entropy or Gini impurity.\n• Random Forests: Combine multiple trees through bootstrap aggregating (bagging) to reduce model variance and prevent overfitting."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Banking institutions use Random Forest Classifiers to detect credit card fraud in real-time. When a card transaction occurs, the ensemble model evaluates transaction amount, country code, and user frequency against hundreds of decision trees, returning a fraud risk score in 10 milliseconds."
      }
    ],
    qa: [
      { q: "What is the key difference between Bagging and Boosting ensemble models?", a: "Bagging (e.g., Random Forest) trains models in parallel independently and averages outputs to reduce variance, whereas Boosting (e.g., XGBoost) trains models sequentially, where each new tree corrects the errors of its predecessor, reducing bias." }
    ],
    youtube: "https://www.youtube.com/watch?v=I3G0YV9Z9E8"
  },
  "cnn": {
    title: "Convolutional Neural Networks (CNNs) & Computer Vision Pipelines",
    intro: "CNNs revolutionize computer vision by preserving spatial geometry. By applying sliding mathematical filters, they extract local patterns like edges, textures, and shapes from image pixels.",
    sections: [
      {
        title: "1. Convolutional Kernels & Feature Extraction",
        content: "A convolution operation slides a small matrix (kernel) over an input image, multiplying overlapping elements. This extracts key spatial features (e.g., horizontal edges) while maintaining weight sharing."
      },
      {
        title: "2. Pooling Layers & Downsampling",
        content: "• Max Pooling: Extracts the maximum value from sub-regions of a feature map.\n• Purpose: Reduces spatial resolution, cuts computational costs, and grants translation invariance so objects are recognized regardless of their exact pixel position."
      },
      {
        title: "3. Flattening & Fully Connected Layers",
        content: "After multiple convolutions and poolings, the 2D feature maps are flattened into a 1D vector and passed to Fully Connected layers (Dense layers) to perform the final classification."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Healthcare diagnostics platforms deploy CNNs to analyze chest X-ray images. The network filters identify abnormal density patterns and fluid collections, alerting radiologists to potential pneumonia cases with an accuracy matching human experts."
      }
    ],
    qa: [
      { q: "Why are CNNs preferred over standard Feedforward Neural Networks for image data?", a: "Standard networks flatten images, destroying 2D spatial relationships and requiring millions of parameters. CNNs utilize spatial convolutions and shared weights, drastically reducing parameters and retaining structural patterns." }
    ],
    youtube: "https://www.youtube.com/watch?v=YRhxdVk_sIs"
  },
  "zero-few-shot": {
    title: "In-Context Learning: Zero-Shot vs Few-Shot Prompt Dynamics",
    intro: "In-Context Learning leverages an LLM's pre-trained vocabulary to perform new tasks without updating model weights. Mastering the structure of these prompts is the fastest way to prototype AI products.",
    sections: [
      {
        title: "1. Zero-Shot Prompting",
        content: "Provides the model with system rules and a target question without giving any examples. The model relies entirely on its pre-trained knowledge base to generate the correct format."
      },
      {
        title: "2. Few-Shot In-Context Learning",
        content: "Injects high-fidelity input-output examples directly inside the prompt template. This conditions the attention weights, forcing the model to mirror the exact formatting, length, and reasoning style of the examples."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Enterprise email parsers utilize Few-Shot prompts to extract support tickets. By injecting 3 template examples showing raw emails mapped to standard JSON structures, the LLM consistently returns perfectly formatted JSON strings, eliminating parsing failures in backend services."
      }
    ],
    qa: [
      { q: "When should you pivot from Few-Shot prompting to Model Fine-Tuning?", a: "Pivot to fine-tuning when the context window is overwhelmed by long prompt examples (saving token cost), when you need to teach a small model highly niche terminology, or when latency needs to be reduced by minimizing prompt sizes." }
    ],
    youtube: "https://www.youtube.com/watch?v=mJD7-Tadsq8"
  },
  "reasoning-chains": {
    title: "Logical Reasoning: Chain-of-Thought & Self-Consistency Prompting",
    intro: "Modern LLMs can struggle with multi-step logical deduction or mathematical calculation. Reasoning chains force models to output intermediate reasoning steps, improving accuracy.",
    sections: [
      {
        title: "1. Chain-of-Thought (CoT)",
        content: "Guides the model to solve complex tasks by displaying its step-by-step logic. The prompt instructs the model: 'Let's think step by step.' This allows the attention weights to focus on sequential intermediate computations."
      },
      {
        title: "2. Self-Consistency (Voting)",
        content: "To handle highly variable logic tasks, the system generates multiple (e.g., 5) parallel reasoning paths at temperature > 0. A majority vote selects the most common final answer, correcting random hallucinations."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Corporate expense auditors use Chain-of-Thought prompts to analyze employee receipts. The model evaluates receipt date, item description, and total price step-by-step against corporate compliance policies, explaining its reasoning before outputting the final APPROVAL or REJECTION verdict."
      }
    ],
    qa: [
      { q: "Why does Chain-of-Thought prompting work better on larger models?", a: "CoT relies on emergent logical capabilities. Smaller models (e.g., < 7B parameters) often struggle to maintain a coherent reasoning chain, sometimes hallucinating or diverging mid-thought, whereas larger models maintain strict logical threads." }
    ],
    youtube: "https://www.youtube.com/watch?v=1tG8W4g_5-w"
  },
  "dockerize-ml": {
    title: "ML Containerization: Packaging FastAPI Models with Docker",
    intro: "Containers eliminate the 'it works on my machine' problem. Docker packages models, runtime code, system libraries, and exact Python versions into immutable, highly portable image formats.",
    sections: [
      {
        title: "1. The Dockerfile Structure",
        content: "• Base Image: Start with an official lightweight Python image (e.g., python:3.10-slim).\n• Dependencies: Copy requirements.txt and install libraries.\n• Source Code: Copy FastAPI models and expose the serving port."
      },
      {
        title: "2. Multi-Stage Builds",
        content: "Optimizes image size by compiling C binaries in a 'build' container, then copying only the final wheels and application files to a clean, minimal 'run' container. This reduces images from 2GB down to 300MB."
      },
      {
        title: "3. Orchestrating FastAPI Servers",
        content: "Using ASGI servers like uvicorn allows the FastAPI container to handle thousands of concurrent API requests asynchronously, passing inputs to the underlying model.predict() function."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Autonomous vehicle startups run image segmenters inside Docker containers. By embedding the PyTorch weights inside a compact Docker image, they can deploy updates across thousands of self-driving cars remotely using container registry pipelines."
      }
    ],
    qa: [
      { q: "Why is multi-stage building critical for production AI Docker containers?", a: "Large Docker images slow down Kubernetes autoscaling and increase vulnerability surfaces. Multi-stage builds strip out heavy build compilers and temp cache files, yielding lightweight, fast-loading production containers." }
    ],
    youtube: "https://www.youtube.com/watch?v=S7bW7E8yKGs"
  },
  "dvc-tracking": {
    title: "Data Version Control (DVC): Managing Datasets & Model Registries",
    intro: "Git is designed for code, not multi-gigabyte models or datasets. DVC extends Git workflows to track large files, mapping lightweight pointer metadata in Git to massive storage buckets.",
    sections: [
      {
        title: "1. Git-DVC Dual Tracking Workflow",
        content: "• Large Datasets: Stored in high-capacity external remotes (e.g., AWS S3, Google Cloud Storage).\n• DVC Files: DVC generates small .dvc files containing md5 hashes. These small metadata files are committed to Git to track exactly which version of the dataset matches which code release."
      },
      {
        title: "2. Data Pipelines & Reproducibility",
        content: "DVC defines data pipelines using dvc.yaml. Running dvc repro tracks data dependencies and only executes stages if upstream dataset files or code files have changed, saving hours of computation."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Voice recognition companies version thousands of hours of audio recordings. The raw WAV files are pushed to a secure AWS S3 bucket via DVC. When a developer pulls the repo, they run git checkout followed by dvc pull, recreating the exact training directory instantly."
      }
    ],
    qa: [
      { q: "How does DVC prevent datasets from bloating git history?", a: "DVC intercepts large datasets and adds them to .gitignore, replacing them with short 1KB .dvc hash files. Only the small .dvc pointers enter Git, keeping repositories incredibly lightweight." }
    ],
    youtube: "https://www.youtube.com/watch?v=kLkBkaZEl2Q"
  },
  "mlflow-tracking": {
    title: "MLflow: Experiment Tracking, Hyperparameters & Model Registries",
    intro: "Tracking hundreds of training runs manually is impossible. MLflow logs metrics, parameters, code revisions, and model artifacts in a centralized server, making models fully reproducible.",
    sections: [
      {
        title: "1. Centralized Experiment Tracking",
        content: "• Metrics: Log numeric values (e.g., Validation Loss, F1 score) epoch-by-epoch to plot curves.\n• Hyperparameters: Log model details like learning rate, batch size, and weight decay.\n• Artifacts: Save trained model weights, confusion matrix images, and environment configs."
      },
      {
        title: "2. The MLflow Model Registry",
        content: "Provides a collaborative hub to manage model lifecycle states. Teams can promote models from 'Staging' to 'Production' via API, enabling zero-downtime hot-swapping."
      },
      {
        title: "🚀 Industrial Realtime Example",
        content: "Financial trading desks run weekly hyperparameter sweeps for stock predictors. By integrating MLflow (mlflow.log_param), the system records every combination of learning rates and network widths. The lead scientist opens the MLflow UI, compares loss curves, and registers the winning model."
      }
    ],
    qa: [
      { q: "What is the difference between an MLflow Experiment run and the MLflow Model Registry?", a: "An experiment run tracks parameters and metrics of a training session. The Model Registry is a central catalog that versions and manages the deployment life cycle of the final exported model artifacts." }
    ],
    youtube: "https://www.youtube.com/watch?v=681-rOM44G4"
  }
};

function App() {
  // Global States
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'roadmap', 'calendar', 'explore', 'lab'
  const [selectedRole, setSelectedRole] = useState('gen-ai');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  
  // Gamification & Progress State
  const [userXp, setUserXp] = useState(380);
  const [completedTopics, setCompletedTopics] = useState({
    "llm-apis": true,
    "vector-search": true,
    "linear-algebra": true,
    "classical-ml": true,
    "zero-few-shot": true,
    "dockerize-ml": true
  });
  const [notification, setNotification] = useState(null);

  // Accordion Steps State
  const [expandedSteps, setExpandedSteps] = useState({
    "Step 1": true,
    "Step 2": true,
    "Step 3": false
  });

  // Splitscreen Lab Workspace States
  const [activeLabId, setActiveLabId] = useState('rag-indexing');
  const [codeValue, setCodeValue] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [isTerminalRunning, setIsTerminalRunning] = useState(false);
  const [terminalStatus, setTerminalStatus] = useState('idle'); // 'idle', 'running', 'success', 'error'
  const [labAchievements, setLabAchievements] = useState([]);

  // Prompt Playground States
  const [sysPrompt, setSysPrompt] = useState('');
  const [usrPrompt, setUsrPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.3);
  const [topP, setTopP] = useState(0.85);
  const [selectedPattern, setSelectedPattern] = useState('Chain-of-Thought (CoT)');
  const [streamingResponse, setStreamingResponse] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);

  // Active Read-Only Javatpoint Article State
  const [activeArticle, setActiveArticle] = useState(null);
  const [activeArticleKey, setActiveArticleKey] = useState(null);

  // Mock Interview Simulator State
  const [interviewScore, setInterviewScore] = useState(0);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerVerified, setIsAnswerVerified] = useState(false);

  // ----------------------------------------------------
  // AΩ CONNECT HUB STATE VARIABLES & SIMULATION LOGIC
  // ----------------------------------------------------
  const [connectSubTab, setConnectSubTab] = useState('chat'); // 'chat', 'forum', 'study', 'booking'
  
  const mentorsList = [
    { 
      id: 'gopher', 
      name: 'Gopher-AI', 
      role: 'Generative AI Expert', 
      avatar: '🤖', 
      welcome: 'Welcome! I am Gopher-AI, specialized in LLM Pipelines, RAG, and Vector databases. Ask me anything about neural search, embeddings, or agent scaling!' 
    },
    { 
      id: 'matrix', 
      name: 'Matrix-Ops', 
      role: 'MLOps Guru', 
      avatar: '⚙️', 
      welcome: 'Greetings! I am Matrix-Ops, specialized in Dockerization, Kubernetes clusters, MLflow pipelines, and cloud orchestrations. What MLOps bottlenecks can we solve today?' 
    },
    { 
      id: 'stats', 
      name: 'Statistical Shepherd', 
      role: 'ML Theory Specialist', 
      avatar: '📊', 
      welcome: 'Hello. I am the Statistical Shepherd, specialized in classical statistics, regression scaling, backpropagation Calculus, and cost optimization math. Let us trace training gradients together!' 
    }
  ];
  
  const [selectedMentor, setSelectedMentor] = useState(mentorsList[0]);
  const [mentorVibe, setMentorVibe] = useState('Socratic'); // 'Socratic', 'Practical', 'Hardcore Interviewer'
  const [chatMessages, setChatMessages] = useState([
    { sender: 'mentor', text: mentorsList[0].welcome, time: '10:00 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatTyping, setIsChatTyping] = useState(false);

  const [discussionPosts, setDiscussionPosts] = useState([
    {
      id: 1,
      title: "Trouble with Backpropagation gradients in Lab 3 (Neural Net Churn)",
      author: "mgore (You)",
      avatar: "M",
      category: "ML Theory",
      time: "2 hours ago",
      content: "I am writing the PyTorch manual SGD weights update. When I run `W1 -= learning_rate * dW1`, my BCE loss is decreasing, but is there a risk of gradient exploding if my learning rate is set too high (e.g. 10.0)? Or should I add a gradient clipping function?",
      votes: 12,
      voted: false,
      replies: [
        { author: "Striver (Guru)", avatar: "S", content: "Yes! A learning rate of 10.0 is extremely high and will cause weights to overshoot, resulting in NaN losses due to mathematical overflow (exploding gradient). Always set learning rates between 0.001 and 0.1 for backpropagation. If you must use high rates, definitely implement gradient clipping via `np.clip(dW1, -1.0, 1.0)` to keep updates bounded.", time: "1 hour ago" }
      ]
    },
    {
      id: 2,
      title: "Why does HNSW index lookup speed beat Flat L2 Search in Pinecone?",
      author: "cyber_learner",
      avatar: "C",
      category: "Gen-AI RAG",
      time: "1 day ago",
      content: "I am comparing flat cosine similarity lookup with an HNSW graph index. When indexing 10 million vectors, HNSW queries under 10ms but the flat linear search takes 800ms. Syntactically, how does the highway skip-list structure achieve this speed?",
      votes: 28,
      voted: false,
      replies: [
        { author: "Love Babbar", avatar: "L", content: "HNSW builds a multi-layered graph where the top layer has few connections (for long-distance skips) and base layers have dense clusters (for near searches). It behaves like a Skip-List data structure but applied to vectors. Lookups are O(log N) rather than O(N) linear scans!", time: "18 hours ago" }
      ]
    },
    {
      id: 3,
      title: "Docker Multi-stage building failing with requirements.txt missing",
      author: "deploy_master",
      avatar: "D",
      category: "MLOps",
      time: "3 days ago",
      content: "In my production multi-stage Dockerfile, stage 1 compiles the wheels but stage 2 fails because it can't find `requirements.txt`. Should I copy the dependencies list across both compilation blocks?",
      votes: 8,
      voted: false,
      replies: [
        { author: "Matrix-Ops (Guru)", avatar: "⚙️", content: "Exactly. The runtime container does not inherit any workspace files unless explicitly copied. You should write: `COPY requirements.txt .` in both the builder stage and the production runner stage, or just copy the pre-compiled wheels directly using: `COPY --from=builder /root/.cache/pip /root/.cache/pip` to run local installation.", time: "2 days ago" }
      ]
    }
  ]);
  
  const [searchForumQuery, setSearchForumQuery] = useState('');
  const [forumCategoryFilter, setForumCategoryFilter] = useState('All');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [forumNewPostTitle, setForumNewPostTitle] = useState('');
  const [forumNewPostContent, setForumNewPostContent] = useState('');
  const [forumNewPostCategory, setForumNewPostCategory] = useState('Gen-AI RAG');
  const [selectedPost, setSelectedPost] = useState(null);
  const [newReplyText, setNewReplyText] = useState('');

  // ----------------------------------------------------
  // FULL-STACK PERSISTENT DATABASE SYNC INTEGRATION
  // ----------------------------------------------------
  const updateUserXp = async (amount) => {
    if (!token) {
      setUserXp(prev => Math.max(0, prev + amount));
      return;
    }
    try {
      const res = await fetch('/api/user/xp', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ xpChange: amount })
      });
      if (res.ok) {
        const data = await res.json();
        setUserXp(data.xp);
      } else {
        setUserXp(prev => Math.max(0, prev + amount));
      }
    } catch (err) {
      console.error('Error updating XP:', err);
      setUserXp(prev => Math.max(0, prev + amount));
    }
  };

  const fetchForumPosts = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/forum', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setDiscussionPosts(data);
      }
    } catch (err) {
      console.error('Error fetching forum posts:', err);
    }
  };

  // Fetch initial profile & syllabus progress from MySQL
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const res = await fetch('/api/user', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUserXp(data.xp);
          setSelectedRole(data.active_role);
          setCompletedTopics(data.completedTopics || {});
          setLabAchievements(data.labAchievements || []);
          setUser({ username: data.username, email: data.email, avatar: data.avatar || data.username.charAt(0).toUpperCase() });
        } else if (res.status === 401 || res.status === 403) {
          // Token expired or invalid, reset token silently to guest mode
          localStorage.removeItem('token');
          setToken('');
          setUser(null);
        }
      } catch (err) {
        console.error('Error fetching user progress from database:', err);
      }
    };
    
    fetchUserData();
    fetchForumPosts();
  }, [token]);

  const changeActiveRole = async (roleId) => {
    setSelectedRole(roleId);
    if (!token) return;
    try {
      await fetch('/api/user/active-role', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ roleId })
      });
    } catch (err) {
      console.error('Error syncing active role:', err);
    }
  };

  const registerAchievement = async (labId, xpEarned, labTitle, isPrompt = false) => {
    if (labAchievements.includes(labId)) return;
    
    setLabAchievements(prev => [...prev, labId]);
    updateUserXp(xpEarned);
    
    if (!token) {
      if (isPrompt) {
        triggerNotification(`🔥 Prompt Simulation complete! Parameter logs saved. +${xpEarned} XP!`);
      } else {
        triggerNotification(`🏆 Congratulations! You successfully verified "${labTitle}"! +${xpEarned} XP!`);
      }
      return;
    }

    try {
      await fetch('/api/user/achievement', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ labId })
      });
    } catch (err) {
      console.error('Error syncing achievement:', err);
    }
    
    if (isPrompt) {
      triggerNotification(`🔥 Prompt Simulation complete! Parameter logs saved. +${xpEarned} XP!`);
    } else {
      triggerNotification(`🏆 Congratulations! You successfully verified "${labTitle}"! +${xpEarned} XP!`);
    }
  };

  // Auth Portal States & Actions
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authUsername, setAuthUsername] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authError, setAuthError] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Outside click listener to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isProfileDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isProfileDropdownOpen]);

  const requireAuth = (callback) => {
    if (!token || !user) {
      triggerNotification("🔒 Sign in to save progress!");
      setIsAuthModalOpen(true);
      return;
    }
    callback();
  };

  const handleAuthSubmit = async (e) => {
    if (e) e.preventDefault();
    setAuthError('');

    if (!authEmail || !authPassword || (!isLoginMode && !authUsername)) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';
    const payload = isLoginMode 
      ? { email: authEmail, password: authPassword }
      : { username: authUsername, email: authEmail, password: authPassword };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser({ username: data.user.username, email: data.user.email, avatar: data.user.avatar || data.user.username.charAt(0).toUpperCase() });
        setAuthEmail('');
        setAuthPassword('');
        setAuthUsername('');
        setIsAuthModalOpen(false);
        triggerNotification(isLoginMode ? `👋 Welcome back, ${data.user.username}!` : `🎉 Account created! Welcome, ${data.user.username}!`);
      } else {
        setAuthError(data.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      console.error('Error during auth:', err);
      setAuthError('Server is currently offline. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setCompletedTopics({});
    setLabAchievements([]);
    setUserXp(0);
    setIsProfileDropdownOpen(false);
    triggerNotification("🔒 Logged out successfully. Session terminated.");
  };

  const studyRoomsList = [
    { 
      id: 'deep-learning', 
      name: 'Deep Learning & Math Lounge', 
      activeCount: 6, 
      desc: 'Discussing SGD mathematics, backpropagation calculus, and CNN pooling grids.', 
      avatar: '📊', 
      peers: ['Striver', 'mgore', 'Alice', 'Bob'] 
    },
    { 
      id: 'rag-ops', 
      name: 'RAG Pipeline Collaboration Hub', 
      activeCount: 4, 
      desc: 'Developing pinecone indexes, dense vectors, and Cohere hybrid reranking.', 
      avatar: '⚡', 
      peers: ['cyber_learner', 'Love Babbar', 'Dave'] 
    },
    { 
      id: 'mlops-kube', 
      name: 'MLOps Docker & Kubernetes Lab', 
      activeCount: 5, 
      desc: 'Solving containerized FastAPI serving, MLflow tracking, and model drift dashboards.', 
      avatar: '🐳', 
      peers: ['deploy_master', 'Hitesh C.'] 
    }
  ];
  
  const [joinedRoomId, setJoinedRoomId] = useState(null);
  const [studyMessages, setStudyMessages] = useState([]);
  const [peerChatInput, setPeerChatInput] = useState('');

  const expertsList = [
    { 
      id: 'striver', 
      name: 'Striver (S. Kalra)', 
      role: 'Founder, takeUforward / Lead DSA Expert', 
      company: 'Ex-Amazon / Media.net', 
      rating: 4.9, 
      cost: 'Free (A2Z Special)', 
      avatar: 'S', 
      slots: ['May 25, 4:00 PM', 'May 25, 6:00 PM', 'May 26, 5:30 PM'] 
    },
    { 
      id: 'babbar', 
      name: 'Love Babbar', 
      role: 'Founder, CodeHelp / FAANG Educator', 
      company: 'Ex-Amazon / Microsoft', 
      rating: 4.8, 
      cost: 'Free (A2Z Special)', 
      avatar: 'L', 
      slots: ['May 25, 3:00 PM', 'May 26, 2:00 PM', 'May 27, 4:00 PM'] 
    },
    { 
      id: 'hitesh', 
      name: 'Hitesh Choudhary', 
      role: 'Staff MLOps Architect / Tech Creator', 
      company: 'Ex-LCO / LearnCodeOnline', 
      rating: 4.8, 
      cost: 'Free (A2Z Special)', 
      avatar: 'H', 
      slots: ['May 25, 1:00 PM', 'May 26, 11:30 AM', 'May 28, 3:00 PM'] 
    },
    { 
      id: 'google-ai', 
      name: 'Dr. Aaron Chen', 
      role: 'Senior AI Scientist', 
      company: 'Google DeepMind', 
      rating: 5.0, 
      cost: 'Free (A2Z Special)', 
      avatar: '🤖', 
      slots: ['May 26, 9:00 PM', 'May 27, 9:00 PM'] 
    }
  ];
  
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [bookingDateSlot, setBookingDateSlot] = useState('');
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  // ----------------------------------------------------
  // AΩ CONNECT SIMULATION DYNAMIC EVENT HANDLERS
  // ----------------------------------------------------
  
  // AI Mentor chat message dispatcher
  const handleSendChatMessage = (customText = null) => {
    const textToSend = customText || chatInput;
    if (!textToSend.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newUserMsg = { sender: 'user', text: textToSend, time: timestamp };
    
    setChatMessages(prev => [...prev, newUserMsg]);
    if (!customText) setChatInput('');
    setIsChatTyping(true);

    // Dynamic NLP Mentor response engine
    setTimeout(() => {
      let mentorResponseText = "";
      const textLower = textToSend.toLowerCase();

      if (selectedMentor.id === 'gopher') {
        if (mentorVibe === 'Socratic') {
          mentorResponseText = "Interesting query! Let's dissect how text embeddings align. If you map a sentence to a 1536-dimensional hyper-plane, what holds those semantic coordinates together? Is it exact character matches, or relative angles in spatial geometry? What happens if you try querying a synonym?";
        } else if (mentorVibe === 'Hardcore Interviewer') {
          mentorResponseText = "Standard interview question: Design a serverless RAG indexing system for 10 million files. How do you handle Pinecone pod density limits, and how does Hierarchical Navigable Small World (HNSW) avoid O(N) linear scan latencies? Be precise with computational complexity!";
        } else {
          mentorResponseText = "Practical layout: To embed documents, use RecursiveCharacterTextSplitter with chunk size 500 and overlap 50. Generate embeddings via text-embedding-004, upsert batches of 100 vectors to Pinecone, and query using cosine similarity to retrieve matching indices under 15ms.";
        }
      } else if (selectedMentor.id === 'matrix') {
        if (mentorVibe === 'Socratic') {
          mentorResponseText = "Why do we isolate libraries? What is the core conceptual difference between running multi-stage Docker builds to strip out compilers versus shipping a raw 2GB image? How does this affect cluster autoscaling speed?";
        } else if (mentorVibe === 'Hardcore Interviewer') {
          mentorResponseText = "Let's test MLOps scaling. If your FastAPI Docker node is locked under high CPU usage, what Prometheus metrics indicate model drift versus thread-pool starvation? Explain how you configure Kubernetes horizontal pod autoscalers (HPA) using custom metric servers.";
        } else {
          mentorResponseText = "Here is the production configuration: Use multi-stage Dockerfiles. Build wheels in stage 1, then copy only compiled libraries into a python:3.10-slim runner. Track parameters with MLflow: log learning rates via mlflow.log_param() and register the final artifacts in S3 buckets.";
        }
      } else { // stats (Statistical Shepherd)
        if (mentorVibe === 'Socratic') {
          mentorResponseText = "Let's reflect on the backpropagation calculus. If standard Gradient Descent shifts weights opposite the loss gradients, why does multiplying by a learning rate act as our directional steps? What happens if your loss surface is non-convex?";
        } else if (mentorVibe === 'Hardcore Interviewer') {
          mentorResponseText = "Derive Stochastic Gradient Descent. What role does the Hessian matrix play in second-order optimization methods, and why are we satisfied with first-order gradient updates in deep neural nets rather than SVD factorization?";
        } else {
          mentorResponseText = "Implementation formula: The forward pass computes activations a2 = sigmoid(XW1 + b1). Loss is calculated via binary cross-entropy. In backpropagation, dz2 = da2 * derivative_sigmoid. W1 shifts by: W1 = W1 - learning_rate * dW1. Keep rate at 0.01 to ensure convergence.";
        }
      }

      setChatMessages(prev => [...prev, {
        sender: 'mentor',
        text: mentorResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsChatTyping(false);
      updateUserXp(10);
      triggerNotification("🤖 Mentor Chat active: +10 XP awarded!");
    }, 1200);
  };

  // Upvote forum posts
  const handleUpvotePost = (postId) => {
    requireAuth(async () => {
      let change = 0;
      setDiscussionPosts(prev => prev.map(post => {
        if (post.id === postId) {
          const added = !post.voted;
          change = added ? 1 : -1;
          return {
            ...post,
            votes: added ? post.votes + 1 : post.votes - 1,
            voted: added
          };
        }
        return post;
      }));
      
      try {
        await fetch(`/api/forum/post/${postId}/vote`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ change })
        });
      } catch (err) {
        console.error('Error syncing vote:', err);
      }
      
      triggerNotification(change > 0 ? "👍 Post upvoted!" : "Removed upvote");
    });
  };

  // Create new Forum Post
  const handleCreateForumPost = () => {
    requireAuth(async () => {
      if (!forumNewPostTitle.trim() || !forumNewPostContent.trim()) {
        triggerNotification("⚠️ Please fill in all fields to publish.");
        return;
      }

      try {
        const res = await fetch('/api/forum/post', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: forumNewPostTitle,
            category: forumNewPostCategory,
            content: forumNewPostContent
          })
        });
        if (res.ok) {
          const data = await res.json();
          setDiscussionPosts(prev => [data.post, ...prev]);
        } else {
          const newPost = {
            id: Date.now(),
            title: forumNewPostTitle,
            author: "mgore (You)",
            avatar: "M",
            category: forumNewPostCategory,
            time: "Just now",
            content: forumNewPostContent,
            votes: 1,
            voted: true,
            replies: []
          };
          setDiscussionPosts(prev => [newPost, ...prev]);
        }
      } catch (err) {
        console.error('Error creating post:', err);
      }

      setIsNewPostModalOpen(false);
      setForumNewPostTitle('');
      setForumNewPostContent('');
      updateUserXp(30);
      triggerNotification("🎉 Question published to Q&A Board! +30 XP!");
    });
  };

  // Reply to Forum Thread
  const handleSubmitForumReply = () => {
    requireAuth(async () => {
      if (!newReplyText.trim()) return;

      try {
        const res = await fetch(`/api/forum/post/${selectedPost.id}/reply`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ content: newReplyText })
        });
        
        if (res.ok) {
          const data = await res.json();
          const updatedPost = {
            ...selectedPost,
            replies: [...selectedPost.replies, data.reply]
          };
          setDiscussionPosts(prev => prev.map(p => p.id === selectedPost.id ? updatedPost : p));
          setSelectedPost(updatedPost);
        } else {
          const newReply = {
            author: "mgore (You)",
            avatar: "M",
            content: newReplyText,
            time: "Just now"
          };
          const updatedPost = {
            ...selectedPost,
            replies: [...selectedPost.replies, newReply]
          };
          setDiscussionPosts(prev => prev.map(p => p.id === selectedPost.id ? updatedPost : p));
          setSelectedPost(updatedPost);
        }
      } catch (err) {
        console.error('Error submitting reply:', err);
      }

      setNewReplyText('');
      updateUserXp(15);
      triggerNotification("💬 Reply published to thread! +15 XP!");
    });
  };

  // Join a Virtual Study Room
  const handleJoinRoom = (roomId) => {
    requireAuth(async () => {
      const roomObj = studyRoomsList.find(r => r.id === roomId);
      if (!roomObj) return;

      setJoinedRoomId(roomId);
      
      try {
        const res = await fetch(`/api/study/rooms/${roomId}/messages`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setStudyMessages(data.map(m => ({
              author: m.author,
              text: m.text,
              time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            })));
          } else {
            const initialMsgs = [
              { author: roomObj.peers[0], text: "Hey! Glad you could join. I am tracing lists, dict lookups, and file reading codes right now." },
              { author: roomObj.peers[1] || 'Alice', text: "Welcome! Setting up my local virtual environment, let me know if anyone needs the pip config command." }
            ];
            
            const loadedMsgs = [
              { author: 'System', text: `✨ You joined the room "${roomObj.name}". Active peers: ${roomObj.peers.join(', ')}.`, time: '10:30 AM' }
            ];

            for (const msg of initialMsgs) {
              const saveRes = await fetch(`/api/study/rooms/${roomId}/messages`, {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(msg)
              });
              if (saveRes.ok) {
                const saved = await saveRes.json();
                loadedMsgs.push({
                  author: saved.author,
                  text: saved.text,
                  time: new Date(saved.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
              }
            }
            setStudyMessages(loadedMsgs);
          }
        }
      } catch (err) {
        console.error('Error fetching room messages:', err);
        setStudyMessages([
          { author: 'System', text: `✨ You joined the room "${roomObj.name}". Active peers: ${roomObj.peers.join(', ')}.`, time: '10:30 AM' },
          { author: roomObj.peers[0], text: "Hey! Glad you could join. I am tracing lists, dict lookups, and file reading codes right now.", time: '10:31 AM' },
          { author: roomObj.peers[1] || 'Alice', text: "Welcome! Setting up my local virtual environment, let me know if anyone needs the pip config command.", time: '10:32 AM' }
        ]);
      }
    });
  };

  // Send Study Room Peer Chat Message
  const handleSendPeerMessage = () => {
    requireAuth(async () => {
      if (!peerChatInput.trim()) return;

      const text = peerChatInput;
      setPeerChatInput('');

      const newUserMsg = { author: 'mgore (You)', text: text, time: 'Just now' };
      setStudyMessages(prev => [...prev, newUserMsg]);

      try {
        await fetch(`/api/study/rooms/${joinedRoomId}/messages`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ author: 'mgore (You)', text: text })
        });
      } catch (err) {
        console.error('Error saving study room message:', err);
      }

      setTimeout(async () => {
        const peerReplies = [
          "That makes total sense! Let's run a test in the Sandbox compiler.",
          "Oh neat! Adding that to my notes, thank you for sharing.",
          "Excellent approach! We are leveling up fast on this roadmap.",
          "Agreed. Let's solve the next textbook coding assignment."
        ];
        const randomPeer = studyRoomsList.find(r => r.id === joinedRoomId)?.peers[0] || 'Alice';
        const randomMsg = peerReplies[Math.floor(Math.random() * peerReplies.length)];

        try {
          const res = await fetch(`/api/study/rooms/${joinedRoomId}/messages`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ author: randomPeer, text: randomMsg })
          });
          if (res.ok) {
            const saved = await res.json();
            setStudyMessages(prev => [...prev, {
              author: saved.author,
              text: saved.text,
              time: new Date(saved.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
          } else {
            setStudyMessages(prev => [...prev, { author: randomPeer, text: randomMsg, time: 'Just now' }]);
          }
        } catch (err) {
          setStudyMessages(prev => [...prev, { author: randomPeer, text: randomMsg, time: 'Just now' }]);
        }
        
        updateUserXp(5);
      }, 1000);
    });
  };

  // Book slot with real-time Expert Mentor
  const handleBookSlot = () => {
    requireAuth(async () => {
      if (!bookingDateSlot) {
        triggerNotification("⚠️ Please pick an available calendar slot.");
        return;
      }

      setIsBookingSuccess(true);
      updateUserXp(40);
      triggerNotification(`📅 Consulting session booked with ${selectedExpert.name}! +40 XP!`);

      try {
        await fetch('/api/bookings', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            expertId: selectedExpert.id,
            expertName: selectedExpert.name,
            slot: bookingDateSlot
          })
        });
      } catch (err) {
        console.error('Error creating booking:', err);
      }
    });
  };


  // Derived variables
  const currentRoleData = rolesData[selectedRole] || rolesData['gen-ai'];
  const userLevel = Math.floor(userXp / 100);
  
  // Custom interactive mock interview data based on role
  const mockInterviewQuestions = {
    "gen-ai": [
      {
        q: "What is the primary function of the attention weights in a Transformer architecture?",
        options: [
          "A. They determine which tokens in the sequence should have high semantic correlation to output predictions.",
          "B. They act as regularization parameters to avoid model overfitting.",
          "C. They perform fast Fourier transforms for audio-to-text decoding.",
          "D. They compress the model token lengths to reduce API server billings."
        ],
        correct: 0,
        explanation: "Attention weights dynamically scale token relationships. By multiplying representations of words by attention coefficients, the model focusing on relevant descriptive words regardless of sequence distance."
      },
      {
        q: "How does Hierarchical Navigable Small World (HNSW) speed up vector search?",
        options: [
          "A. It splits the vectors into exact balanced binary trees like Red-Black Trees.",
          "B. It constructs multi-layered graphs where top layers allow long-distance skips, while base layers refine near matches.",
          "C. It converts standard vector embeddings to simple integer hashes.",
          "D. It restricts similarity searches strictly to cosine coordinates."
        ],
        correct: 1,
        explanation: "HNSW is a graph-based Approximate Nearest Neighbor (ANN) index. It builds multi-layered highway routes representing different spatial hierarchies, making lookup highly sub-linear (O(log N))."
      }
    ],
    "ml-engineer": [
      {
        q: "Why do we apply standardizing scaling (mean=0, variance=1) on inputs for Gradient Descent models?",
        options: [
          "A. To prevent features with extremely large numeric scales from dominating gradients and distorting cost contours.",
          "B. To convert non-linear relationships to linear relationships.",
          "C. To artificially increase training dataset sizes.",
          "D. To force the classification margins to remain perfectly symmetrical."
        ],
        correct: 0,
        explanation: "Unscaled features create highly stretched, elliptical loss contours. Standardization makes the loss surface more spherical, enabling smooth gradient updates directly toward the global minimum."
      }
    ]
  };

  const currentQuestions = mockInterviewQuestions[selectedRole] || mockInterviewQuestions['gen-ai'];

  // Scroll to terminal if running code
  const terminalRef = useRef(null);

  // Handle Notifications helper
  const triggerNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Synchronize dynamic code when selected lab changes
  useEffect(() => {
    const activeLab = labsData[activeLabId];
    if (activeLab && activeLab.codeWorkspace) {
      if (activeLab.codeWorkspace.isPromptSandbox) {
        setSysPrompt(activeLab.codeWorkspace.starterSystemPrompt);
        setUsrPrompt(activeLab.codeWorkspace.starterUserPrompt);
        setStreamingResponse(null);
      } else {
        setCodeValue(activeLab.codeWorkspace.starterCode);
        setTerminalLogs(["Console ready. Click 'Run Lab' to execute compiler."]);
        setTerminalStatus('idle');
      }
    }
  }, [activeLabId]);

  // Handle tab switches and scroll resetting
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle topic completion
  const handleToggleTopic = (topicId, topicTitle) => {
    requireAuth(async () => {
      const isCompleted = !!completedTopics[topicId];
      const newCompleted = !isCompleted;
      setCompletedTopics({
        ...completedTopics,
        [topicId]: newCompleted
      });

      try {
        await fetch('/api/user/completed-topic', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ topicId, topicTitle, isCompleted: newCompleted })
        });
      } catch (err) {
        console.error('Error syncing completed topic:', err);
      }

      if (newCompleted) {
        updateUserXp(50);
        triggerNotification(`🎉 Completed: "${topicTitle}"! +50 XP Awarded!`);
      } else {
        updateUserXp(-50);
      }
    });
  };

  // Execute Code Simulator
  const handleRunCode = () => {
    setIsTerminalRunning(true);
    setTerminalStatus('running');
    setTerminalLogs(["[19:42:01] Loading environment kernels...", "[19:42:02] Injecting local variables..."]);

    const targetLab = labsData[activeLabId];
    if (!targetLab) return;

    let progressIndex = 0;
    const finalResult = targetLab.codeWorkspace.validationCode(codeValue);

    const interval = setInterval(() => {
      if (progressIndex < finalResult.logs.length) {
        setTerminalLogs(prev => [...prev, finalResult.logs[progressIndex]]);
        progressIndex++;
      } else {
        clearInterval(interval);
        setIsTerminalRunning(false);
        
        if (finalResult.success) {
          setTerminalStatus('success');
          // Add to achievements
          if (!labAchievements.includes(activeLabId)) {
            registerAchievement(activeLabId, finalResult.xpEarned, targetLab.title);
          }
          // Mark topic as completed
          const targetTopic = currentRoleData.syllabus.flatMap(s => s.topics).find(t => t.labId === activeLabId);
          if (targetTopic) {
            setCompletedTopics(prev => ({ ...prev, [targetTopic.id]: true }));
          }
        } else {
          setTerminalStatus('error');
        }
      }
    }, 600);
  };

  // Reset starter code
  const handleResetCode = () => {
    const activeLab = labsData[activeLabId];
    if (activeLab && activeLab.codeWorkspace && !activeLab.codeWorkspace.isPromptSandbox) {
      setCodeValue(activeLab.codeWorkspace.starterCode);
      setTerminalLogs(["[SYSTEM] Code resetting... Loaded standard default blueprint."]);
      setTerminalStatus('idle');
    }
  };

  // Simulate LLM Prompt generator streaming
  const handleRunPromptPlayground = () => {
    const activeLab = labsData[activeLabId];
    if (!activeLab || !activeLab.codeWorkspace || !activeLab.codeWorkspace.isPromptSandbox) return;

    setIsStreaming(true);
    setStreamingResponse(null);

    const result = activeLab.codeWorkspace.simulationFunction(sysPrompt, usrPrompt, temperature, selectedPattern);
    
    // Simulate streaming by character blocks
    let charIdx = 0;
    const fullText = result.response;
    
    const interval = setInterval(() => {
      if (charIdx <= fullText.length) {
        setStreamingResponse({
          ...result,
          response: fullText.substring(0, charIdx)
        });
        charIdx += Math.max(3, Math.floor(Math.random() * 8));
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        // Completed prompt sandbox award
        if (!labAchievements.includes(activeLabId)) {
          registerAchievement(activeLabId, result.xpEarned, activeLab.title, true);
        }
        
        // Mark topic completed
        const targetTopic = currentRoleData.syllabus.flatMap(s => s.topics).find(t => t.labId === activeLabId);
        if (targetTopic) {
          setCompletedTopics(prev => ({ ...prev, [targetTopic.id]: true }));
        }
      }
    }, 30);
  };

  // Load Prompt Preset
  const handleLoadPreset = (preset) => {
    setSysPrompt(preset.system);
    setUsrPrompt(preset.user);
    setStreamingResponse(null);
  };

  // Toggle Accordion step
  const toggleStep = (stepTitle) => {
    setExpandedSteps({
      ...expandedSteps,
      [stepTitle]: !expandedSteps[stepTitle]
    });
  };

  // Launch a Lab View
  const launchLab = (labId) => {
    setActiveLabId(labId);
    handleTabChange('lab');
  };

  // Open theoretical article modal (Javatpoint style)
  const openJavatpointArticle = (topicId) => {
    let normalizedId = topicId;
    if (topicId === 'pytorch-nn') normalizedId = 'pytorch-backpropagation';
    if (topicId === 'prompt-playground-lab') normalizedId = 'prompt-engineering-sandbox';

    const article = javatpointArticles[normalizedId];
    if (article) {
      setActiveArticle(article);
      setActiveArticleKey(normalizedId);
    } else {
      // Dynamic fallback generator so NO topic in ANY path is empty!
      const titleLabel = topicId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      const generatedArticle = {
        title: titleLabel,
        intro: `Master standard ${titleLabel} configurations in production AI workflows. Ingest datasets, configure mathematical optimization models, and track deployment parameters.`,
        sections: [
          {
            title: "1. Core Overview",
            content: `The systematic deployment of ${titleLabel} is critical to modern Artificial Intelligence. Selecting optimized, highly compatible structures guarantees low-latency computational runtimes.`
          },
          {
            title: "2. Architectural Blueprint & Best Practices",
            content: "• Data Preprocessing: Clean, scale, and filter input metrics to eliminate raw outliers.\n• Optimization Methods: Shift internal neural weights dynamically to minimize mathematical loss functions.\n• Deployment Safety: Verify pipeline metrics under simulated enterprise API server payloads."
          },
          {
            title: "🚀 Industrial Realtime Example",
            content: `Production nodes utilize ${titleLabel} to build forecasting architectures. By orchestrating robust model checkpoints on unified datasets, lookup response times drop from hours to milliseconds under high concurrent request volumes.`
          }
        ],
        qa: [
          { q: `What is the key benefit of automating ${titleLabel} pipelines?`, a: "It guarantees reproducible analytical experiments, prevents mathematical overflow errors, and yields standard production models ready for container serving." }
        ],
        youtube: "https://www.youtube.com/watch?v=rfscVS0vtbw"
      };
      setActiveArticle(generatedArticle);
      setActiveArticleKey(normalizedId);
    }
  };

  // Submit Answer to Trivia Quiz
  const handleSubmitAnswer = (idx) => {
    if (isAnswerVerified) return;
    setSelectedAnswer(idx);
    setIsAnswerVerified(true);
    
    const isCorrect = idx === currentQuestions[activeQuestionIdx].correct;
    if (isCorrect) {
      updateUserXp(25);
      triggerNotification("✅ Correct Answer! +25 XP awarded!");
    } else {
      triggerNotification("❌ Incorrect answer. Read the Javatpoint explanation to learn!");
    }
  };

  // Next Interview Question
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerVerified(false);
    setActiveQuestionIdx(prev => (prev + 1) % currentQuestions.length);
  };

  // Filtered Roles search logic
  const filteredRoles = Object.values(rolesData).filter(role => {
    const matchesSearch = role.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          role.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (difficultyFilter === 'all') return matchesSearch;
    return matchesSearch && role.difficulty.toLowerCase().includes(difficultyFilter);
  });

  // Calculate selected role checklist progress
  const getRoleProgress = (roleId) => {
    const role = rolesData[roleId];
    if (!role) return 0;
    const topics = role.syllabus.flatMap(s => s.topics);
    const completed = topics.filter(t => !!completedTopics[t.id]).length;
    return Math.round((completed / topics.length) * 100);
  };

  return (
    <>
      <div className="neural-grid"></div>

      {/* Dynamic Success/Warning Notification Popups */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: 'rgba(7, 9, 19, 0.95)',
          border: '2px solid var(--accent-emerald)',
          boxShadow: 'var(--glow-emerald)',
          borderRadius: '12px',
          padding: '1rem 1.5rem',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          animation: 'slide-in 0.3s ease-out'
        }}>
          <Sparkles color="var(--accent-emerald)" size={20} />
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>{notification}</div>
        </div>
      )}

      {/* Global Navigation Header */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-logo">AΩ</div>
          <div>
            <span className="brand-name">AI-A2Z Learn</span>
            <span className="brand-badge">Premium Studio</span>
          </div>
        </div>

        <nav className="nav-links">
          <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => handleTabChange('dashboard')}>
            <Compass size={18} />
            Roles Hub
          </button>
          <button className={`nav-item ${activeTab === 'roadmap' ? 'active' : ''}`} onClick={() => handleTabChange('roadmap')}>
            <Trophy size={18} />
            A2Z Sheet
          </button>
          <button className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => handleTabChange('calendar')}>
            <Calendar size={18} />
            Day Planner
          </button>
          <button className={`nav-item ${activeTab === 'explore' ? 'active' : ''}`} onClick={() => handleTabChange('explore')}>
            <Briefcase size={18} />
            Career Center
          </button>
          <button className={`nav-item ${activeTab === 'lab' ? 'active' : ''}`} onClick={() => handleTabChange('lab')}>
            <Terminal size={18} />
            Live Lab Space
          </button>
          <button className={`nav-item ${activeTab === 'connect' ? 'active' : ''}`} onClick={() => handleTabChange('connect')}>
            <Users size={18} />
            AΩ Connect
          </button>
        </nav>

        {/* Dynamic User Statistics Card Widget & Logout / Login */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {!token || !user ? (
            <button className="header-login-btn" onClick={() => { setIsAuthModalOpen(true); setIsLoginMode(true); }}>
              <Lock size={14} />
              Sign In
            </button>
          ) : (
            <div ref={dropdownRef} style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
              <div className="user-profile-widget">
                <div className="xp-bar-container">
                  <div className="xp-label">
                    <span>{user.username.toUpperCase()}</span>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{userXp} XP</span>
                  </div>
                  <div className="xp-progress-bg">
                    <div className="xp-progress-fill" style={{ width: `${userXp % 100}%` }}></div>
                  </div>
                </div>
                <div 
                  className="avatar-circle" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  {user.avatar || user.username.charAt(0).toUpperCase()}
                </div>
              </div>

              {isProfileDropdownOpen && (
                <div className="profile-dropdown-card">
                  <div className="profile-dropdown-header">
                    <p className="profile-dropdown-name">{user.username}</p>
                    <p className="profile-dropdown-email">{user.email}</p>
                  </div>
                  <button className="profile-dropdown-item" onClick={() => {
                    triggerNotification(`👤 Profile: ${user.username} (${user.email})`);
                    setIsProfileDropdownOpen(false);
                  }}>
                    Profile
                  </button>
                  <button className="profile-dropdown-item" onClick={() => {
                    triggerNotification("⚙️ Secure Fallback System Status: Operational");
                    setIsProfileDropdownOpen(false);
                  }}>
                    Setting
                  </button>
                  <button className="profile-dropdown-item" onClick={() => {
                    handleTabChange('roadmap');
                    setIsProfileDropdownOpen(false);
                  }}>
                    My Learning Path
                  </button>
                  <button className="profile-dropdown-item danger" onClick={() => {
                    handleLogout();
                    setIsProfileDropdownOpen(false);
                  }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content Workspace Wrapper */}
      <main className="main-wrapper">
        
        {/* TAB 1: LANDING DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <section className="welcome-hero">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(168, 85, 247, 0.1)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(168, 85, 247, 0.2)', marginBottom: '1rem' }}>
                <Sparkles size={14} color="#c084fc" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#c084fc', letterSpacing: '0.5px' }}>Next-Generation AI Training Suite</span>
              </div>
              <h1 className="welcome-title">
                Master the Whole <span className="title-glow">AI Universe</span> <br />From 0 to Advanced Labs
              </h1>
              <p className="welcome-subtitle">
                An elite A2Z syllabus incorporating comprehensive theory (Javatpoint style), structural roadmaps (Striver style), and industry-standard live coding sandboxes. Become highly employable.
              </p>
            </section>

            {/* Live Search and Filters */}
            <div className="search-filter-row">
              <div className="search-box">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search AI roles, technologies (LangChain, PyTorch...)..." 
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <button className={`filter-btn ${difficultyFilter === 'all' ? 'active' : ''}`} onClick={() => setDifficultyFilter('all')}>All Roles</button>
                <button className={`filter-btn ${difficultyFilter === 'beginner' ? 'active' : ''}`} onClick={() => setDifficultyFilter('beginner')}>Beginner</button>
                <button className={`filter-btn ${difficultyFilter === 'intermediate' ? 'active' : ''}`} onClick={() => setDifficultyFilter('intermediate')}>Intermediate</button>
                <button className={`filter-btn ${difficultyFilter === 'advanced' ? 'active' : ''}`} onClick={() => setDifficultyFilter('advanced')}>Advanced</button>
              </div>
            </div>

            {/* Role Cards Grid Layout */}
            <div className="roles-grid">
              {filteredRoles.map(role => {
                const progress = getRoleProgress(role.id);
                return (
                  <div 
                    key={role.id} 
                    className="role-card" 
                    onClick={() => {
                      changeActiveRole(role.id);
                      handleTabChange('roadmap');
                    }}
                  >
                    <div className="role-badge-row">
                      <span className={`difficulty-badge ${role.difficulty.toLowerCase().includes('advanced') ? 'advanced' : role.difficulty.toLowerCase().includes('intermediate') ? 'intermediate' : 'beginner'}`}>
                        {role.difficulty}
                      </span>
                      <span className="salary-badge">
                        <TrendingUp size={14} />
                        {role.salary}
                      </span>
                    </div>

                    <h3 className="role-title">{role.title}</h3>
                    <p className="role-desc">{role.shortDesc}</p>

                    <div className="role-skills-wrap">
                      {role.skills.slice(0, 4).map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                      {role.skills.length > 4 && (
                        <span className="skill-tag" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' }}>+{role.skills.length - 4} more</span>
                      )}
                    </div>

                    <div style={{ margin: '1rem 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                        <span>Role Learning Progress</span>
                        <span style={{ fontWeight: 700, color: 'white' }}>{progress}%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(to right, var(--accent-indigo), var(--accent-purple))', borderRadius: '10px' }}></div>
                      </div>
                    </div>

                    <div className="role-footer">
                      <div className="role-stat">
                        <Calendar size={14} />
                        <span>{role.duration} Course</span>
                      </div>
                      <span className="learn-cta">
                        Start Learning <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                );
              })}
              {filteredRoles.length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'var(--bg-glass)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                  <HelpCircle size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                  <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>No AI Role Found</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search criteria or choosing a different filter.</p>
                </div>
              )}
            </div>

            {/* Industrial Realtime Features Highlight Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)',
              border: '1px solid var(--border-glass-active)',
              borderRadius: '16px',
              padding: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
              marginTop: '1.5rem'
            }}>
              <div style={{ flex: '1', minWidth: '280px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>🎯 Fully Implemented Sandbox Compiler & AI Playgrounds</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  No extra setups required! Write actual Python indexing models, test optimization gradients, and adjust generative prompt variables with streaming outputs simulating modern enterprise AI agents.
                </p>
              </div>
              <button className="btn-primary" onClick={() => launchLab('rag-indexing')}>
                Open Sandbox Workspace <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: A2Z ROADMAP & SHEET (Striver style) */}
        {activeTab === 'roadmap' && (
          <div>
            {/* Sheet Banner */}
            <div className="roadmap-header-card">
              <div className="roadmap-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span className="brand-badge" style={{ margin: 0, background: 'rgba(168, 85, 247, 0.2)' }}>Flagship Sheet</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>• {currentRoleData.duration} curriculum</span>
                </div>
                <h2>A2Z AI roadmap: {currentRoleData.title}</h2>
                <p>Follow our day-by-day structured curriculum. Master theories, mark items completed, and practice in real-time developer labs.</p>
              </div>

              <div className="roadmap-action-btns">
                <button className="btn-secondary" onClick={() => handleTabChange('dashboard')}>
                  Switch Role
                </button>
                <button className="btn-primary" onClick={() => handleTabChange('calendar')}>
                  Calendar View
                </button>
              </div>
            </div>

            {/* Accordion Steps Grid */}
            <div className="roadmap-container">
              <div className="roadmap-main-list">
                {currentRoleData.syllabus.map((step) => {
                  const isExpanded = !!expandedSteps[step.title];
                  const completedInStep = step.topics.filter(t => !!completedTopics[t.id]).length;
                  
                  return (
                    <div key={step.step} className={`roadmap-step-card ${isExpanded ? 'expanded' : ''}`}>
                      <div className="roadmap-step-header" onClick={() => toggleStep(step.title)}>
                        <div className="step-info-title">
                          <span className="step-number">{step.step}</span>
                          <span className="step-title">{step.title}</span>
                        </div>

                        <div className="step-right">
                          <span className="step-duration">{step.duration}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                            {completedInStep} / {step.topics.length} Done
                          </span>
                          {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                        </div>
                      </div>

                      {/* Expanding content details */}
                      {isExpanded && (
                        <div className="roadmap-topics-list">
                          {step.topics.map(topic => {
                            const isTopicDone = !!completedTopics[topic.id];
                            return (
                              <div key={topic.id} className={`roadmap-topic-row ${isTopicDone ? 'completed' : ''}`}>
                                <div className="topic-checkbox-container">
                                  <input 
                                    type="checkbox" 
                                    className="topic-checkbox"
                                    checked={isTopicDone}
                                    onChange={() => handleToggleTopic(topic.id, topic.title)}
                                  />
                                </div>

                                <div 
                                  className="topic-details" 
                                  onClick={() => javatpointArticles[topic.id] && openJavatpointArticle(topic.id)}
                                  style={{ cursor: javatpointArticles[topic.id] ? 'pointer' : 'default', flex: 1 }}
                                >
                                  <h4 style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s', margin: 0, fontSize: '0.95rem', color: 'white' }}>
                                    {topic.title}
                                    {javatpointArticles[topic.id] && <Sparkles size={12} color="var(--accent-cyan)" style={{ opacity: 0.8 }} />}
                                  </h4>
                                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{topic.desc}</p>
                                  {/* Link to Javatpoint Article if exists */}
                                  {javatpointArticles[topic.id] && (
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); openJavatpointArticle(topic.id); }}
                                      style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 600, padding: 0, marginTop: '0.25rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', outline: 'none' }}
                                    >
                                      <FileText size={12} /> Read Javatpoint Conceptual Guide
                                    </button>
                                  )}
                                </div>

                                <div className="topic-badge-col">
                                  <span className={`status-badge ${isTopicDone ? 'completed' : topic.status === 'in-progress' ? 'in-progress' : 'locked'}`}>
                                    {isTopicDone ? 'completed' : topic.status}
                                  </span>
                                </div>

                                <div className="action-col">
                                  {topic.hasLab ? (
                                    <button className="btn-action-lab" onClick={() => launchLab(topic.labId)}>
                                      Practice Lab 🧪
                                    </button>
                                  ) : (
                                    <button 
                                      className="btn-action-concept" 
                                      onClick={() => openJavatpointArticle(topic.id)}
                                      style={{
                                        background: 'rgba(168, 85, 247, 0.1)',
                                        border: '1px solid rgba(168, 85, 247, 0.3)',
                                        color: '#c084fc',
                                        padding: '0.35rem 0.75rem',
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        transition: 'all 0.2s ease'
                                      }}
                                    >
                                      <BookOpen size={12} /> Concept
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sidebar stats & leaderboard */}
              <div className="roadmap-sidebar">
                
                {/* Visual Progress Wheel */}
                <div className="sidebar-card">
                  <h3>Your Sheet Progress</h3>
                  <div className="progress-wheel-container">
                    <div className="progress-wheel">
                      <div className="wheel-circle-bg"></div>
                      <div className="wheel-percentage">{getRoleProgress(selectedRole)}%</div>
                    </div>

                    <div className="sidebar-stats-grid">
                      <div className="sidebar-stat-box">
                        <div className="sidebar-stat-num">{Object.keys(completedTopics).length}</div>
                        <div className="sidebar-stat-lbl">Topics Solved</div>
                      </div>
                      <div className="sidebar-stat-box">
                        <div className="sidebar-stat-num">{labAchievements.length}</div>
                        <div className="sidebar-stat-lbl">Verified Labs</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gamified Global Leaderboard */}
                <div className="sidebar-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, border: 'none', padding: 0 }}>Active Leaderboard</h3>
                    <Trophy size={16} color="#ffd700" />
                  </div>
                  
                  <div className="leaderboard-list">
                    <div className="leaderboard-item">
                      <div className="user-rank-info">
                        <span className="rank-number">1</span>
                        <div className="rank-avatar" style={{ background: 'rgba(255, 215, 0, 0.15)', border: '1px solid #ffd700' }}>S</div>
                        <span className="rank-name">Striver (Guru)</span>
                      </div>
                      <span className="rank-xp">1,820 XP</span>
                    </div>

                    <div className="leaderboard-item">
                      <div className="user-rank-info">
                        <span className="rank-number">2</span>
                        <div className="rank-avatar">L</div>
                        <span className="rank-name">Love Babbar</span>
                      </div>
                      <span className="rank-xp">1,150 XP</span>
                    </div>

                    <div className="leaderboard-item">
                      <div className="user-rank-info">
                        <span className="rank-number">3</span>
                        <div className="rank-avatar">H</div>
                        <span className="rank-name">Hitesh C.</span>
                      </div>
                      <span className="rank-xp">850 XP</span>
                    </div>

                    <div className="leaderboard-item me">
                      <div className="user-rank-info">
                        <span className="rank-number">4</span>
                        <div className="rank-avatar" style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-indigo))' }}>You</div>
                        <span className="rank-name">mgore (You)</span>
                      </div>
                      <span className="rank-xp" style={{ color: '#c084fc' }}>{userXp} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DAY-BY-DAY CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="calendar-view-container">
            <div className="calendar-header">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(6, 182, 212, 0.1)', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.2)', marginBottom: '0.5rem' }}>
                <span className="pulse-glowing-indicator"></span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>Day-by-Day Calendar</span>
              </div>
              <h2>90-Day Structural Learning Journey</h2>
              <p>Allocate a standard 1.5 hours daily. Follow this visual step sequence. Completing a day unlocks subsequent modules.</p>
            </div>

            <div className="calendar-grid">
              {Array.from({ length: 28 }).map((_, idx) => {
                const day = idx + 1;
                // Distribute syllabus topics across days for visual demonstration
                let dayTitle = "Foundations";
                let status = "locked";
                let labId = null;
                
                if (day <= 5) {
                  dayTitle = "API Integration";
                  status = completedTopics["llm-apis"] ? "completed" : "in-progress";
                } else if (day <= 10) {
                  dayTitle = "Buffer Memory";
                  status = completedTopics["chat-history"] ? "completed" : "in-progress";
                } else if (day <= 15) {
                  dayTitle = "Structured Output";
                  status = "locked";
                } else if (day <= 20) {
                  dayTitle = "Semantic Search";
                  status = completedTopics["vector-search"] ? "completed" : "in-progress";
                  labId = "rag-indexing";
                } else if (day <= 25) {
                  dayTitle = "Transformers CoT";
                  status = completedTopics["zero-few-shot"] ? "completed" : "in-progress";
                  labId = "prompt-playground";
                }

                return (
                  <div 
                    key={day} 
                    className={`calendar-day-card ${status}`}
                    onClick={() => {
                      if (status !== 'locked') {
                        if (labId) {
                          launchLab(labId);
                        } else {
                          // open a corresponding article or standard info
                          setSelectedRole('gen-ai');
                          handleTabChange('roadmap');
                        }
                      } else {
                        triggerNotification("🔒 Day module is currently locked. Complete earlier tasks to unlock!");
                      }
                    }}
                  >
                    <div className="cal-day-num">Day {day}</div>
                    <div className="cal-day-title">{dayTitle}</div>
                    <div className="cal-status-icon">
                      {status === 'completed' && <CheckCircle2 size={16} />}
                      {status === 'in-progress' && <Activity size={16} />}
                      {status === 'locked' && <Lock size={14} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: CAREER EXPLORATION / RADAR (SVG) */}
        {activeTab === 'explore' && (
          <div className="career-exploration-dashboard">
            <div className="career-grid-layout">
              <div className="career-details-pane">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <TrendingUp size={16} color="var(--accent-cyan)" />
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>AI JOB ROLE MATRIX</span>
                </div>
                <h2>AI Role Analyzer: {currentRoleData.title}</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  {currentRoleData.longDesc}
                </p>

                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Essential Engineering Skills:</h3>
                <div className="role-skills-wrap" style={{ marginBottom: '2.5rem' }}>
                  {currentRoleData.skills.map((skill, i) => (
                    <span key={i} className="skill-tag" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>{skill}</span>
                  ))}
                </div>

                {/* Day-by-Day timeline summary inside Exploration */}
                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.5rem' }}>Roadmap Timeline Phases:</h3>
                <div className="career-timeline-vertical">
                  {currentRoleData.syllabus.map((s, i) => (
                    <div key={i} className="timeline-step-node">
                      <div className="timeline-step-bullet"></div>
                      <div className="timeline-step-content">
                        <h4>{s.step}: {s.title}</h4>
                        <p>Focus Period: {s.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Radar Graph and Mock Interview Simulator */}
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '1rem', textAlign: 'center' }}>Skill Distribution Profile</h3>
                
                {/* Interactive SVG Radar Chart */}
                <div className="radar-chart-container">
                  <svg className="career-skills-radar" viewBox="0 0 220 220">
                    {/* Poly rings */}
                    <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <circle cx="110" cy="110" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <circle cx="110" cy="110" r="30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    
                    {/* Axis rays */}
                    <line x1="110" y1="20" x2="110" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="20" y1="110" x2="200" y2="110" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="46" y1="46" x2="174" y2="174" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    
                    {/* Skill Labels */}
                    <text x="110" y="15" fill="var(--text-muted)" fontSize="8" textAnchor="middle">PROGRAMMING</text>
                    <text x="210" y="113" fill="var(--text-muted)" fontSize="8" textAnchor="start">SYSTEM ARCH</text>
                    <text x="110" y="215" fill="var(--text-muted)" fontSize="8" textAnchor="middle">DEEP LEARNING</text>
                    <text x="10" y="113" fill="var(--text-muted)" fontSize="8" textAnchor="end">PROMPT DESIGN</text>
                    
                    {/* Dynamic Skill Poly matching the selected role */}
                    {selectedRole === 'gen-ai' ? (
                      <polygon 
                        points="110,40 185,110 110,150 50,110" 
                        fill="rgba(170, 59, 255, 0.2)" 
                        stroke="var(--accent-purple)" 
                        strokeWidth="2" 
                      />
                    ) : (
                      <polygon 
                        points="110,30 150,110 110,185 75,110" 
                        fill="rgba(6, 182, 212, 0.2)" 
                        stroke="var(--accent-cyan)" 
                        strokeWidth="2" 
                      />
                    )}
                  </svg>
                </div>

                {/* Gamified Mock Interview Trivia Simulator */}
                <div className="interview-trivia-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h4 style={{ color: 'white', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <HelpCircle size={16} color="var(--accent-purple)" />
                      Industrial Mini-Interview
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Question {activeQuestionIdx + 1} of {currentQuestions.length}</span>
                  </div>

                  <p className="interview-question">
                    {currentQuestions[activeQuestionIdx].q}
                  </p>

                  <div className="interview-options-list">
                    {currentQuestions[activeQuestionIdx].options.map((option, index) => {
                      let btnClass = "";
                      if (selectedAnswer !== null) {
                        if (index === currentQuestions[activeQuestionIdx].correct) {
                          btnClass = "correct";
                        } else if (selectedAnswer === index) {
                          btnClass = "wrong";
                        }
                      }
                      return (
                        <button 
                          key={index} 
                          className={`interview-option-btn ${btnClass}`}
                          onClick={() => handleSubmitAnswer(index)}
                          disabled={isAnswerVerified}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswerVerified && (
                    <div>
                      <div className="interview-feedback-box">
                        <strong>Conceptual Breakdown (Javatpoint style):</strong> <br />
                        {currentQuestions[activeQuestionIdx].explanation}
                      </div>
                      <button className="btn-next-question" onClick={handleNextQuestion}>
                        Next Interview Question <ArrowRight size={14} style={{ display: 'inline', marginLeft: '0.25rem' }} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INTERACTIVE SPLITSCREEN LAB WORKSPACE */}
        {activeTab === 'lab' && (
          <div>
            {/* Lab header bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '0.75rem 1.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="step-number" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                  Active Sandbox
                </span>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', margin: 0 }}>
                  {labsData[activeLabId] ? labsData[activeLabId].title : "AI Sandbox Console"}
                </h2>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="lab-meta-badge diff">
                  {labsData[activeLabId] ? labsData[activeLabId].difficulty : "Intermediate"}
                </span>
                <span className="lab-meta-badge">
                  ⏱️ {labsData[activeLabId] ? labsData[activeLabId].estimatedTime : "45 Mins"}
                </span>
                <button 
                  className="btn-secondary" 
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                  onClick={() => handleTabChange('roadmap')}
                >
                  Return to Sheet
                </button>
              </div>
            </div>

            {/* Splitscreen Layout */}
            <div className="splitscreen-workspace">
              
              {/* Left Panel: Javatpoint Text & Instructions */}
              <div className="lab-panel-left">
                <div className="lab-panel-header">
                  <h3>Conceptual Guide & Procedures</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    Javatpoint Verified Core
                  </span>
                </div>

                <div className="lab-scrollable-content">
                  {labsData[activeLabId] ? (
                    <div>
                      {/* Javatpoint Intro */}
                      <p className="javatpoint-intro">
                        {labsData[activeLabId].theory.intro}
                      </p>

                      {/* Realtime Industrial Scenario */}
                      <div className="javatpoint-scenario-box">
                        <h4>
                          <Activity size={14} />
                          Industrial Real-time Scenario
                        </h4>
                        <p>{labsData[activeLabId].scenario}</p>
                      </div>

                      {/* Javatpoint Detailed Sections */}
                      {labsData[activeLabId].theory.sections.map((section, idx) => (
                        <div key={idx}>
                          <h4 className="javatpoint-heading">
                            <Sparkles size={14} color="var(--accent-purple)" />
                            {section.title}
                          </h4>
                          <p className="javatpoint-paragraph">{section.content}</p>
                        </div>
                      ))}

                      {/* Javatpoint Styled Table */}
                      {labsData[activeLabId].theory.table && (
                        <div>
                          <h4 className="javatpoint-heading">
                            <Sliders size={14} color="var(--accent-cyan)" />
                            Comparative Architecture Reference Table
                          </h4>
                          <table className="javatpoint-table">
                            <thead>
                              <tr>
                                {labsData[activeLabId].theory.table.headers.map((h, i) => (
                                  <th key={i}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {labsData[activeLabId].theory.table.rows.map((row, rIdx) => (
                                <tr key={rIdx}>
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx}>{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Step-by-Step Lab Instructions */}
                      <div className="javatpoint-instruction-box">
                        <h4>
                          <Code size={14} />
                          Your Practical Assignment
                        </h4>
                        <p>{labsData[activeLabId].codeWorkspace.instructions}</p>
                      </div>
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-secondary)' }}>Select a topic with an active practical lab from the roadmap sheet.</p>
                  )}
                </div>
              </div>

              {/* Right Panel: Interactive Editor Workspace or Prompt Sandbox */}
              <div className="lab-panel-right">
                
                {/* 1. CODING WORKSPACE */}
                {labsData[activeLabId] && !labsData[activeLabId].codeWorkspace.isPromptSandbox && (
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="code-workspace-editor">
                      <div className="editor-header">
                        <div className="editor-tabs">
                          <button className="editor-tab active">main.py</button>
                          <button className="editor-tab">requirements.txt</button>
                        </div>

                        <div className="editor-actions">
                          <button className="btn-editor-reset" onClick={handleResetCode}>
                            <RotateCcw size={12} />
                          </button>
                          <button className="btn-editor-run" onClick={handleRunCode} disabled={isTerminalRunning}>
                            <Play size={12} />
                            Run & Validate Lab
                          </button>
                        </div>
                      </div>

                      <div className="code-area-wrapper">
                        {/* Static numbers */}
                        <div className="code-line-numbers">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div key={i}>{i + 1}</div>
                          ))}
                        </div>

                        <textarea 
                          className="code-textarea"
                          value={codeValue}
                          onChange={(e) => setCodeValue(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Simulated output compiler console */}
                    <div className="terminal-console" ref={terminalRef}>
                      <div className="terminal-header">
                        <span className="terminal-title">
                          <Terminal size={14} /> Output Console logs
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span className={`terminal-indicator ${terminalStatus}`}></span>
                          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700 }}>
                            {terminalStatus}
                          </span>
                        </div>
                      </div>

                      <div className="terminal-body">
                        {terminalLogs.map((log, i) => {
                          let typeClass = "info";
                          if (log.includes("[SYSTEM]")) typeClass = "system";
                          else if (log.includes("[SUCCESS]")) typeClass = "success";
                          else if (log.includes("Error:") || log.includes("SyntaxError")) typeClass = "error";
                          
                          return (
                            <div key={i} className={`terminal-log-line ${typeClass}`}>
                              {log}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. PROMPT PLAYGROUND WORKSPACE */}
                {labsData[activeLabId] && labsData[activeLabId].codeWorkspace.isPromptSandbox && (
                  <div className="prompt-playground-workspace">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="playground-section-header">
                        <Sliders size={14} /> Prompt Parameter Controls
                      </span>
                      
                      <button className="btn-editor-run" onClick={handleRunPromptPlayground} disabled={isStreaming}>
                        <Sparkles size={12} /> Submit to AI Agent
                      </button>
                    </div>

                    {/* Sliders parameters and Reasoning choice */}
                    <div className="playground-controls-grid">
                      <div className="playground-parameters-box">
                        <div className="parameter-slider-item">
                          <div className="slider-labels">
                            <span>Temperature</span>
                            <span className="slider-val">{temperature}</span>
                          </div>
                          <input 
                            type="range" 
                            min="0.0" 
                            max="1.0" 
                            step="0.05" 
                            className="param-input-slider" 
                            value={temperature}
                            onChange={(e) => setTemperature(parseFloat(e.target.value))}
                          />
                        </div>

                        <div className="parameter-slider-item">
                          <div className="slider-labels">
                            <span>Top-P (Nucleus)</span>
                            <span className="slider-val">{topP}</span>
                          </div>
                          <input 
                            type="range" 
                            min="0.5" 
                            max="1.0" 
                            step="0.05" 
                            className="param-input-slider" 
                            value={topP}
                            onChange={(e) => setTopP(parseFloat(e.target.value))}
                          />
                        </div>
                      </div>

                      {/* Reasoning pattern selection */}
                      <div className="playground-parameters-box" style={{ justifyContent: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>Reasoning Pattern Preset:</span>
                        <select 
                          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: 'white', padding: '0.4rem', fontSize: '0.8rem', fontFamily: 'var(--font-sans)', outline: 'none' }}
                          value={selectedPattern}
                          onChange={(e) => setSelectedPattern(e.target.value)}
                        >
                          <option>Chain-of-Thought (CoT)</option>
                          <option>Few-Shot Structured</option>
                          <option>Zero-Shot Direct</option>
                        </select>
                      </div>
                    </div>

                    {/* Preset Templates chips */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <span className="playground-section-header">Templates Presets</span>
                      <div className="prompt-templates-row">
                        {labsData[activeLabId].codeWorkspace.templates.map((tmpl, idx) => (
                          <button key={idx} className="prompt-template-chip" onClick={() => handleLoadPreset(tmpl)}>
                            {tmpl.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Prompts Input Boxes */}
                    <div className="playground-prompt-box">
                      <span className="playground-section-header">System Instructions (Role Play)</span>
                      <textarea 
                        className="playground-textbox"
                        value={sysPrompt}
                        onChange={(e) => setSysPrompt(e.target.value)}
                      />
                    </div>

                    <div className="playground-prompt-box">
                      <span className="playground-section-header">User Request Context</span>
                      <textarea 
                        className="playground-textbox"
                        value={usrPrompt}
                        onChange={(e) => setUsrPrompt(e.target.value)}
                      />
                    </div>

                    {/* LLM Output stream simulator */}
                    <div className="playground-prompt-box">
                      <span className="playground-section-header">Streamed LLM Model Response</span>
                      
                      <div className="generated-response-box">
                        <div className="generated-response-metrics">
                          <span>Latency: {streamingResponse ? streamingResponse.latency : '0ms'}</span>
                          <span>Tokens: {streamingResponse ? streamingResponse.tokensUsed : 0} context tokens</span>
                          <span>Validation: Safe Generation</span>
                        </div>

                        <div className="generated-response-body">
                          {isStreaming && !streamingResponse ? (
                            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Calculating context attention weights...</span>
                          ) : streamingResponse ? (
                            streamingResponse.response
                          ) : (
                            <span style={{ color: 'var(--text-muted)' }}>Configure parameter prompts and click 'Submit to AI Agent' to review model thoughts.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: AI-AΩ CONNECT HUB */}
        {activeTab === 'connect' && (
          <div className="connect-hub-container">
            {/* Connect Welcome Banner */}
            <div className="connect-welcome-banner">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(6, 182, 212, 0.1)', padding: '5px 12px', borderRadius: '20px', border: '1px solid rgba(6, 182, 212, 0.2)', marginBottom: '0.75rem' }}>
                <Users size={14} color="var(--accent-cyan)" />
                <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-cyan)', letterSpacing: '0.5px' }}>Peer-to-Peer & AI Nexus</span>
              </div>
              <h2>AI-AΩ Connect: Elite Developer Collaborative Suite</h2>
              <p>Solve learning bottlenecks, get resume reviews from AI Career Mentors, join visual study rooms, and book direct calls with top industry engineers.</p>
              
              {/* Connect Sub-navigation tabs */}
              <div className="connect-tabs-row">
                <button className={`connect-tab-btn ${connectSubTab === 'chat' ? 'active' : ''}`} onClick={() => setConnectSubTab('chat')}>
                  <MessageSquare size={16} /> AI Career Mentor Chat
                </button>
                <button className={`connect-tab-btn ${connectSubTab === 'forum' ? 'active' : ''}`} onClick={() => setConnectSubTab('forum')}>
                  <Globe size={16} /> Peer Q&A Forums
                </button>
                <button className={`connect-tab-btn ${connectSubTab === 'study' ? 'active' : ''}`} onClick={() => setConnectSubTab('study')}>
                  <Users size={16} /> Virtual Study Lounges
                </button>
                <button className={`connect-tab-btn ${connectSubTab === 'booking' ? 'active' : ''}`} onClick={() => setConnectSubTab('booking')}>
                  <CalendarRange size={16} /> 1-on-1 Mentorship Booking
                </button>
              </div>
            </div>

            {/* CONNECT SUB-TAB 1: AI MENTOR CHAT */}
            {connectSubTab === 'chat' && (
              <div className="connect-chat-workspace">
                {/* Left side: Mentors Selector */}
                <div className="chat-mentors-sidebar">
                  <div className="sidebar-section-header">Select Specialized Mentor</div>
                  <div className="mentor-cards-list">
                    {mentorsList.map(m => (
                      <div 
                        key={m.id} 
                        className={`mentor-select-card ${selectedMentor.id === m.id ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedMentor(m);
                          setChatMessages([{ sender: 'mentor', text: m.welcome, time: '10:00 AM' }]);
                          setIsChatTyping(false);
                        }}
                      >
                        <span className="mentor-avatar-icon">{m.avatar}</span>
                        <div style={{ flex: 1 }}>
                          <div className="mentor-card-name">{m.name}</div>
                          <div className="mentor-card-role">{m.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="sidebar-section-header" style={{ marginTop: '1.5rem' }}>Customize Mentor Personality</div>
                  <div className="vibe-selectors-group">
                    {['Socratic', 'Practical', 'Hardcore Interviewer'].map(v => (
                      <button 
                        key={v} 
                        className={`vibe-btn ${mentorVibe === v ? 'active' : ''}`}
                        onClick={() => {
                          setMentorVibe(v);
                          triggerNotification(`💡 Mentor persona switched to "${v}" mode!`);
                        }}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right side: Live Chat Box */}
                <div className="chat-interface-panel">
                  <div className="chat-panel-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="mentor-header-avatar">{selectedMentor.avatar}</span>
                      <div>
                        <h4 style={{ color: 'white', margin: 0, fontSize: '0.95rem' }}>{selectedMentor.name} <span className="active-dot"></span></h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>{selectedMentor.role} • Personality: {mentorVibe}</p>
                      </div>
                    </div>
                  </div>

                  <div className="chat-bubbles-scrollarea">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`chat-bubble-row ${msg.sender}`}>
                        {msg.sender === 'mentor' && <span className="bubble-avatar">{selectedMentor.avatar}</span>}
                        <div className={`chat-bubble ${msg.sender}`}>
                          <div className="bubble-text">{msg.text}</div>
                          <span className="bubble-time">{msg.time}</span>
                        </div>
                        {msg.sender === 'user' && <span className="bubble-avatar user">M</span>}
                      </div>
                    ))}

                    {isChatTyping && (
                      <div className="chat-bubble-row mentor">
                        <span className="bubble-avatar">{selectedMentor.avatar}</span>
                        <div className="chat-bubble mentor typing">
                          <span className="typing-dot"></span>
                          <span className="typing-dot"></span>
                          <span className="typing-dot"></span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Preset quick question chips */}
                  <div className="chat-preset-chips-row">
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Quick Prompts:</span>
                    <button onClick={() => handleSendChatMessage("How do lists and dictionaries store data differently in memory?")}>
                      Memory lists vs dicts
                    </button>
                    <button onClick={() => handleSendChatMessage("Give me a mock interview question on Python file writing & try/except blocks.")}>
                      File write mock Q
                    </button>
                    <button onClick={() => handleSendChatMessage("How do I build a simple web API in Flask?")}>
                      Flask API snippet
                    </button>
                  </div>

                  {/* Chat Input row */}
                  <div className="chat-input-bar">
                    <input 
                      type="text" 
                      placeholder={`Ask ${selectedMentor.name} a question... (e.g. explain list slicing, Flask routing...)`}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSendChatMessage(); }}
                    />
                    <button className="btn-send-chat" onClick={() => handleSendChatMessage()}>
                      <Send size={14} /> Send
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CONNECT SUB-TAB 2: DISCUSSION FORUM BOARD */}
            {connectSubTab === 'forum' && (
              <div className="connect-forum-workspace">
                {/* Forum Toolbar */}
                <div className="forum-toolbar-row">
                  <div className="search-box" style={{ maxWidth: '380px', margin: 0 }}>
                    <Search size={16} className="search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search questions, categories, code tags..."
                      className="search-input"
                      style={{ padding: '0.6rem 1rem 0.6rem 2.6rem', fontSize: '0.85rem' }}
                      value={searchForumQuery}
                      onChange={(e) => setSearchForumQuery(e.target.value)}
                    />
                  </div>

                  <div className="forum-category-filters">
                    {['All', 'Gen-AI RAG', 'ML Theory', 'MLOps', 'Python Core'].map(cat => (
                      <button 
                        key={cat} 
                        className={`forum-filter-chip ${forumCategoryFilter === cat ? 'active' : ''}`}
                        onClick={() => setForumCategoryFilter(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => setIsNewPostModalOpen(true)}>
                    <PlusCircle size={14} /> Ask a Question
                  </button>
                </div>

                {/* Forum Thread list */}
                <div className="forum-threads-list">
                  {discussionPosts
                    .filter(post => {
                      const matchesSearch = post.title.toLowerCase().includes(searchForumQuery.toLowerCase()) || 
                                            post.content.toLowerCase().includes(searchForumQuery.toLowerCase());
                      const matchesCategory = forumCategoryFilter === 'All' || post.category === forumCategoryFilter;
                      return matchesSearch && matchesCategory;
                    })
                    .map(post => (
                      <div key={post.id} className="forum-thread-card" onClick={() => setSelectedPost(post)}>
                        <div className="thread-vote-column" onClick={(e) => { e.stopPropagation(); handleUpvotePost(post.id); }}>
                          <button className={`vote-arrow ${post.voted ? 'active' : ''}`}>▲</button>
                          <span className="vote-count">{post.votes}</span>
                        </div>

                        <div className="thread-content-column">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                            <span className="thread-category-badge">{post.category}</span>
                            <span className="thread-meta-txt">Posted by {post.author} • {post.time}</span>
                          </div>
                          <h4 className="thread-card-title">{post.title}</h4>
                          <p className="thread-card-snippet">{post.content.substring(0, 160)}...</p>
                        </div>

                        <div className="thread-replies-column">
                          <MessageCircle size={16} color="var(--text-muted)" />
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{post.replies.length} replies</span>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Forum Post detail overlay thread panel */}
                {selectedPost && (
                  <div className="post-detail-overlay-backdrop" onClick={() => setSelectedPost(null)}>
                    <div className="post-detail-overlay-content" onClick={(e) => e.stopPropagation()}>
                      <div className="overlay-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span className="thread-category-badge">{selectedPost.category}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Posted by {selectedPost.author} • {selectedPost.time}</span>
                        </div>
                        <button className="btn-close-overlay" onClick={() => setSelectedPost(null)}>&times;</button>
                      </div>

                      <div className="overlay-body-scrollable">
                        <h3 className="overlay-thread-title">{selectedPost.title}</h3>
                        
                        <div className="original-post-body">
                          <div className="post-author-avatar">{selectedPost.avatar}</div>
                          <div style={{ flex: 1 }}>
                            <div className="post-author-name">{selectedPost.author}</div>
                            <div className="post-description-text">{selectedPost.content}</div>
                          </div>
                        </div>

                        {/* Thread Replies List */}
                        <div className="overlay-replies-header">Community Answers ({selectedPost.replies.length})</div>
                        <div className="overlay-replies-list">
                          {selectedPost.replies.map((rep, idx) => (
                            <div key={idx} className="overlay-reply-card">
                              <div className="reply-author-avatar" style={{ background: rep.avatar === '⚙️' ? 'rgba(168, 85, 247, 0.2)' : 'var(--bg-tertiary)' }}>{rep.avatar}</div>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                  <span className="reply-author-name">{rep.author}</span>
                                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{rep.time}</span>
                                </div>
                                <div className="reply-content-text">{rep.content}</div>
                              </div>
                            </div>
                          ))}
                          {selectedPost.replies.length === 0 && (
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic', textAlign: 'center', margin: '2rem 0' }}>No replies posted yet. Be the first to share an answer!</p>
                          )}
                        </div>
                      </div>

                      {/* Reply Editor input */}
                      <div className="overlay-reply-editor">
                        <textarea 
                          placeholder="Type your structured answer or troubleshooting response... (Supports Markdown)"
                          value={newReplyText}
                          onChange={(e) => setNewReplyText(e.target.value)}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                          <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }} onClick={handleSubmitForumReply}>
                            Publish Answer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Create New Question Modal Popup Form */}
                {isNewPostModalOpen && (
                  <div className="post-detail-overlay-backdrop" onClick={() => setIsNewPostModalOpen(false)}>
                    <div className="post-detail-overlay-content" style={{ maxWidth: '640px', height: 'auto' }} onClick={(e) => e.stopPropagation()}>
                      <div className="overlay-header">
                        <h4 style={{ color: 'white', margin: 0, fontWeight: 700 }}>Ask the AI Career Community</h4>
                        <button className="btn-close-overlay" onClick={() => setIsNewPostModalOpen(false)}>&times;</button>
                      </div>

                      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>Question Title</label>
                          <input 
                            type="text" 
                            placeholder="e.g. How does list slicing copy references in memory?"
                            style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', padding: '0.6rem', borderRadius: '8px', color: 'white', fontSize: '0.85rem', outline: 'none' }}
                            value={forumNewPostTitle}
                            onChange={(e) => setForumNewPostTitle(e.target.value)}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>Topic Category</label>
                            <select 
                              style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', padding: '0.6rem', borderRadius: '8px', color: 'white', fontSize: '0.85rem', outline: 'none' }}
                              value={forumNewPostCategory}
                              onChange={(e) => setForumNewPostCategory(e.target.value)}
                            >
                              <option>Gen-AI RAG</option>
                              <option>ML Theory</option>
                              <option>MLOps</option>
                              <option>Python Core</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>Explain your question in depth</label>
                          <textarea 
                            placeholder="Describe your error logs, copy code chunks, or explain theoretical difficulties..."
                            style={{ width: '100%', minHeight: '150px', background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', padding: '0.6rem', borderRadius: '8px', color: 'white', fontSize: '0.85rem', fontFamily: 'var(--font-sans)', outline: 'none', resize: 'vertical' }}
                            value={forumNewPostContent}
                            onChange={(e) => setForumNewPostContent(e.target.value)}
                          />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                          <button className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }} onClick={() => setIsNewPostModalOpen(false)}>Cancel</button>
                          <button className="btn-primary" style={{ padding: '0.4rem 1.25rem', fontSize: '0.8rem' }} onClick={handleCreateForumPost}>Publish Question</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CONNECT SUB-TAB 3: VIRTUAL PEER STUDY LOUNGES */}
            {connectSubTab === 'study' && (
              <div className="connect-study-workspace">
                {/* 1. ROOMS LIST GRID */}
                {!joinedRoomId ? (
                  <div className="study-rooms-grid">
                    {studyRoomsList.map(room => (
                      <div key={room.id} className="study-room-card">
                        <div className="room-card-glow-indicator"></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                          <span className="room-card-avatar-tag">{room.avatar}</span>
                          <span className="room-active-count">
                            <span className="pulse-glowing-indicator green"></span>
                            {room.activeCount} active online
                          </span>
                        </div>
                        <h4 className="room-card-name">{room.name}</h4>
                        <p className="room-card-desc">{room.desc}</p>
                        
                        <div className="room-peers-row">
                          {room.peers.map((peer, pIdx) => (
                            <span key={pIdx} className="peer-avatar-circle" title={peer}>
                              {peer.charAt(0)}
                            </span>
                          ))}
                        </div>

                        <button className="btn-primary" style={{ width: '100%', padding: '0.5rem 0', fontSize: '0.8rem', marginTop: '1rem' }} onClick={() => handleJoinRoom(room.id)}>
                          Join Study Room & Chat
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* 2. JOINED ACTIVE STUDY ROOM VIEW */
                  <div className="joined-study-room-pane">
                    {/* Room Header bar */}
                    <div className="joined-room-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span className="room-header-avatar">📡</span>
                        <div>
                          <h4 style={{ color: 'white', margin: 0, fontSize: '0.95rem' }}>
                            {studyRoomsList.find(r => r.id === joinedRoomId)?.name}
                          </h4>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>
                            Peers in Room: {studyRoomsList.find(r => r.id === joinedRoomId)?.peers.join(', ')}
                          </p>
                        </div>
                      </div>

                      <button className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }} onClick={() => setJoinedRoomId(null)}>
                        Leave Room
                      </button>
                    </div>

                    {/* Chat wall scroll section */}
                    <div className="room-chat-scrollarea">
                      {studyMessages.map((msg, idx) => {
                        const isSystem = msg.author === 'System';
                        const isMe = msg.author === 'mgore (You)';
                        return (
                          <div key={idx} className={`room-chat-bubble-row ${isSystem ? 'system' : isMe ? 'me' : 'peer'}`}>
                            {!isSystem && <span className="room-chat-badge">{msg.author.charAt(0)}</span>}
                            <div className={`room-chat-bubble ${isSystem ? 'system' : isMe ? 'me' : 'peer'}`}>
                              {!isSystem && <div className="room-chat-author">{msg.author}</div>}
                              <div className="room-chat-text">{msg.text}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Peer chat input */}
                    <div className="chat-input-bar" style={{ padding: '1rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
                      <input 
                        type="text" 
                        placeholder="Say hello, share code tags, or ask peers for help..."
                        value={peerChatInput}
                        onChange={(e) => setPeerChatInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSendPeerMessage(); }}
                      />
                      <button className="btn-send-chat" onClick={handleSendPeerMessage}>
                        <Send size={14} /> Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CONNECT SUB-TAB 4: 1-ON-1 EXPERT BOOKING */}
            {connectSubTab === 'booking' && (
              <div className="connect-booking-workspace">
                <div className="booking-welcome-bar">
                  <h3>Schedule Live Consulting Sessions</h3>
                  <p>Book private audio call slots with founders and engineers. Get personalized code reviews, career directions, and portfolio audits.</p>
                </div>

                <div className="experts-booking-grid">
                  {expertsList.map(exp => (
                    <div key={exp.id} className="expert-booking-card">
                      <div className="expert-card-profile">
                        <div className="expert-card-avatar" style={{ background: exp.avatar === '🤖' ? 'rgba(6, 182, 212, 0.2)' : 'linear-gradient(135deg, var(--accent-purple), var(--accent-indigo))' }}>
                          {exp.avatar}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="expert-card-name">
                            {exp.name}
                            <span className="rating-badge">★ {exp.rating}</span>
                          </div>
                          <div className="expert-card-role">{exp.role}</div>
                          <div className="expert-card-company">{exp.company}</div>
                        </div>
                      </div>

                      <div className="expert-card-details">
                        <div className="detail-row">
                          <span className="detail-lbl">Price Rate</span>
                          <span className="detail-val" style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{exp.cost}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-lbl">Duration</span>
                          <span className="detail-val">30-Min Call</span>
                        </div>
                      </div>

                      <button 
                        className="btn-primary" 
                        style={{ width: '100%', padding: '0.5rem 0', fontSize: '0.8rem', marginTop: '1rem' }}
                        onClick={() => {
                          setSelectedExpert(exp);
                          setBookingDateSlot(exp.slots[0]);
                          setIsBookingSuccess(false);
                        }}
                      >
                        Schedule Private Session
                      </button>
                    </div>
                  ))}
                </div>

                {/* 1-on-1 Calendar Booking Modal overlay */}
                {selectedExpert && (
                  <div className="post-detail-overlay-backdrop" onClick={() => setSelectedExpert(null)}>
                    <div className="post-detail-overlay-content" style={{ maxWidth: '480px', height: 'auto' }} onClick={(e) => e.stopPropagation()}>
                      <div className="overlay-header">
                        <h4 style={{ color: 'white', margin: 0, fontWeight: 700 }}>Schedule with {selectedExpert.name}</h4>
                        <button className="btn-close-overlay" onClick={() => setSelectedExpert(null)}>&times;</button>
                      </div>

                      {!isBookingSuccess ? (
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                            <div className="expert-card-avatar" style={{ margin: 0, width: '40px', height: '40px' }}>{selectedExpert.avatar}</div>
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{selectedExpert.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedExpert.role}</div>
                            </div>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>Select Available Time Slot</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              {selectedExpert.slots.map((slot, sIdx) => (
                                <label 
                                  key={sIdx} 
                                  style={{
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem', 
                                    background: bookingDateSlot === slot ? 'rgba(168, 85, 247, 0.08)' : 'var(--bg-secondary)', 
                                    border: bookingDateSlot === slot ? '1px solid var(--accent-purple)' : '1px solid var(--border-glass)',
                                    padding: '0.6rem 0.75rem', 
                                    borderRadius: '8px', 
                                    cursor: 'pointer',
                                    color: bookingDateSlot === slot ? 'white' : 'var(--text-secondary)',
                                    fontSize: '0.85rem',
                                    fontWeight: bookingDateSlot === slot ? 700 : 500,
                                    transition: 'all 0.2s'
                                  }}
                                >
                                  <input 
                                    type="radio" 
                                    name="slot" 
                                    checked={bookingDateSlot === slot} 
                                    onChange={() => setBookingDateSlot(slot)}
                                    style={{ accentColor: 'var(--accent-purple)' }}
                                  />
                                  <span>📅 {slot}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Private Session Goal</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Technical review of RAG indexing code or career guidance" 
                              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', padding: '0.6rem', borderRadius: '8px', color: 'white', fontSize: '0.85rem', outline: 'none' }}
                            />
                          </div>

                          <button className="btn-primary" style={{ width: '100%', padding: '0.6rem 0', fontSize: '0.85rem', marginTop: '0.5rem' }} onClick={handleBookSlot}>
                            Confirm Session Reservation
                          </button>
                        </div>
                      ) : (
                        /* Dynamic Booking success screen */
                        <div style={{ padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
                          <span style={{ fontSize: '3rem', filter: 'drop-shadow(var(--glow-emerald))' }}>🎉</span>
                          <h3 style={{ color: 'white', margin: 0, fontWeight: 800 }}>Consultation Reserved Successfully!</h3>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                            Your appointment with <strong>{selectedExpert.name}</strong> on <strong>{bookingDateSlot}</strong> is locked. Access links have been sent to your registered email profile. +40 XP awarded!
                          </p>
                          <button className="btn-primary" style={{ padding: '0.5rem 2rem', fontSize: '0.8rem', marginTop: '0.5rem' }} onClick={() => setSelectedExpert(null)}>
                            Close Panel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* JAVATPOINT THEORETICAL READS POPUP OVERLAY PANEL */}
      {activeArticle && (() => {
        // Resolve active step topics for sidebar listing
        const activeStep = currentRoleData.syllabus.find(step =>
          step.topics.some(t => t.id === activeArticleKey)
        ) || currentRoleData.syllabus[0];

        return (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(5, 7, 15, 0.88)',
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(16px)',
            padding: '1.5rem'
          }}>
            <div style={{
              background: 'var(--bg-secondary)',
              border: '2px solid var(--border-glass-active)',
              boxShadow: 'var(--glow-purple)',
              borderRadius: '16px',
              width: '95%',
              maxWidth: '980px',
              height: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Javatpoint Top Category Bar */}
              <div style={{
                background: 'var(--bg-tertiary)',
                borderBottom: '1px solid var(--border-glass)',
                padding: '0.6rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                scrollbarWidth: 'none'
              }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>QUICK LINKS:</span>
                <span style={{ color: 'white', fontWeight: 600 }}>Python Tutorial</span>
                <span>|</span>
                <span style={{ cursor: 'pointer' }} onClick={() => triggerNotification("ℹ— Interview Q&A Hub selected.")}>Interview Q&A</span>
                <span>|</span>
                <span style={{ cursor: 'pointer' }} onClick={() => triggerNotification("ℹ— Practice Quizzes opened.")}>Quizzes</span>
                <span>|</span>
                <span style={{ cursor: 'pointer' }} onClick={() => triggerNotification("ℹ— Data Structures Cheat Sheet loaded.")}>Data Structures</span>
                <span>|</span>
                <span style={{ cursor: 'pointer' }} onClick={() => triggerNotification("ℹ— Deep Learning Cheat Sheet loaded.")}>Deep Learning</span>
                <span>|</span>
                <span style={{ cursor: 'pointer' }} onClick={() => triggerNotification("ℹ— ML Mathematics Reference guide opened.")}>ML Math</span>
                <span>|</span>
                <span style={{ cursor: 'pointer' }} onClick={() => openJavatpointArticle('numpy-arrays')}>NumPy</span>
                <span>|</span>
                <span style={{ cursor: 'pointer' }} onClick={() => openJavatpointArticle('pandas-wrangling')}>Pandas</span>
                <span>|</span>
                <span style={{ cursor: 'pointer' }} onClick={() => openJavatpointArticle('vector-search')}>Vector Search</span>
              </div>

              {/* Main Popup header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.01)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={18} color="var(--accent-purple)" />
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'white', fontWeight: 700 }}>AI Studio verified textbook</h3>
                </div>
                <button 
                  onClick={() => setActiveArticle(null)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer', lineHeight: '1', outline: 'none' }}
                >
                  &times;
                </button>
              </div>

              {/* Split Dual-Pane body */}
              <div style={{ flex: '1', display: 'flex', overflow: 'hidden' }}>
                
                {/* Left Sidebar Pane */}
                <div style={{
                  width: '240px',
                  background: 'rgba(5, 7, 15, 0.4)',
                  borderRight: '1px solid var(--border-glass)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflowY: 'auto',
                  padding: '1.25rem 0.75rem'
                }}>
                  {/* Step Category Header */}
                  <div style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'var(--accent-purple)',
                    letterSpacing: '1px',
                    marginBottom: '0.75rem',
                    paddingLeft: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <Sliders size={12} />
                    {activeStep.title}
                  </div>

                  {/* Sidebar Menu items list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {activeStep.topics.map(t => {
                      const isActive = t.id === activeArticleKey || (t.id === 'pytorch-nn' && activeArticleKey === 'pytorch-backpropagation') || (t.id === 'prompt-playground-lab' && activeArticleKey === 'prompt-engineering-sandbox');
                      return (
                        <button
                          key={t.id}
                          onClick={() => openJavatpointArticle(t.id)}
                          style={{
                            textAlign: 'left',
                            background: isActive ? 'rgba(168, 85, 247, 0.12)' : 'transparent',
                            border: isActive ? '1px solid rgba(168, 85, 247, 0.25)' : '1px solid transparent',
                            borderRadius: '8px',
                            padding: '0.6rem 0.75rem',
                            color: isActive ? 'white' : 'var(--text-secondary)',
                            fontSize: '0.8rem',
                            fontWeight: isActive ? 700 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            outline: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <span style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: isActive ? 'var(--accent-purple)' : 'transparent',
                            boxShadow: isActive ? 'var(--glow-purple)' : 'none'
                          }}></span>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {t.title.replace(" Lab", "").replace(" Sandbox", "")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Content Pane */}
                <div style={{ flex: '1', overflowY: 'auto', padding: '2rem' }} className="javatpoint-scrollbar">
                  {/* Metadata and Title info */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Section: {activeStep.duration} Syllabus
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Last Updated: 22 May, 2026
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
                    {activeArticle.title}
                  </h2>
                  <p className="javatpoint-intro" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.01)', padding: '1rem', borderRadius: '10px', borderLeft: '3px solid var(--accent-purple)' }}>
                    {activeArticle.intro}
                  </p>

                  {/* Rendering textbook articles content */}
                  {activeArticle.sections.map((sec, idx) => {
                    const isExample = sec.title.includes("Example") || sec.title.includes("🚀");
                    return (
                      <div 
                        key={idx} 
                        style={{ 
                          marginTop: '1.5rem',
                          background: isExample ? 'rgba(168, 85, 247, 0.04)' : 'transparent',
                          border: isExample ? '1px dashed rgba(168, 85, 247, 0.25)' : 'none',
                          borderRadius: isExample ? '10px' : '0',
                          padding: isExample ? '1.25rem' : '0'
                        }}
                      >
                        <h4 style={{ 
                          color: isExample ? '#c084fc' : 'white', 
                          fontSize: '1rem', 
                          fontWeight: 700, 
                          marginBottom: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}>
                          {sec.title}
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.55', whiteSpace: 'pre-wrap', margin: 0 }}>
                          {sec.content}
                        </p>
                      </div>
                    );
                  })}

                  {/* Interview Q&A Section */}
                  <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(6, 182, 212, 0.04)', borderRadius: '10px', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
                    <h4 style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <HelpCircle size={14} /> Interview Spotlight Q&A
                    </h4>
                    {activeArticle.qa && activeArticle.qa.map((qa, i) => (
                      <div key={i} style={{ fontSize: '0.85rem' }}>
                        <div style={{ color: 'white', fontWeight: 600, marginBottom: '0.25rem' }}>Q: {qa.q}</div>
                        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.45' }}>A: {qa.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Popup footer */}
              <div style={{ borderTop: '1px solid var(--border-glass)', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {activeArticle.youtube && (
                  <a 
                    href={activeArticle.youtube} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="youtube-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#f87171',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 0 10px rgba(239, 68, 68, 0.1)'
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch YouTube Lecture Video
                  </a>
                )}
                <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }} onClick={() => { setActiveArticle(null); setActiveArticleKey(null); }}>
                  Acknowledged & Ready
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {isAuthModalOpen && (
        <div className="auth-overlay" onClick={(e) => { if (e.target.classList.contains('auth-overlay')) setIsAuthModalOpen(false); }}>
          <div className="neural-grid"></div>
          <div className="auth-container">
            <button className="auth-modal-close-btn" onClick={() => setIsAuthModalOpen(false)}>✕</button>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div className="brand-logo" style={{ width: '56px', height: '56px', fontSize: '1.8rem' }}>AΩ</div>
            </div>
            <h2 className="auth-title">
              {isLoginMode ? 'Welcome back to A2Z Learn' : 'Create your A2Z Account'}
            </h2>
            <p className="auth-subtitle">
              {isLoginMode ? 'Sign in to access your persistent roadmaps & sandbox labs.' : 'Open an account to track syllabus progress, bookings, & chats.'}
            </p>

            {authError && <div className="auth-error">{authError}</div>}

            <form onSubmit={handleAuthSubmit}>
              {!isLoginMode && (
                <div className="auth-form-group">
                  <label className="auth-label">Username</label>
                  <input 
                    type="text" 
                    className="auth-input" 
                    placeholder="e.g. mgore" 
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="auth-form-group">
                <label className="auth-label">Email Address</label>
                <input 
                  type="email" 
                  className="auth-input" 
                  placeholder="e.g. mgore@a2z.com" 
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-label">Password</label>
                <input 
                  type="password" 
                  className="auth-input" 
                  placeholder="••••••••" 
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-submit-btn">
                {isLoginMode ? 'Sign In to Workspace' : 'Open My Account'}
              </button>
            </form>

            <p className="auth-toggle-text">
              {isLoginMode ? "New to A2Z Connect Hub?" : "Already have an account?"}
              <button 
                className="auth-toggle-btn"
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setAuthError('');
                }}
              >
                {isLoginMode ? 'Open Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
