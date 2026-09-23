// Official Programiz Compiler Page Mappings
export const PROGRAMIZ_COMPILER_URLS = {
  python: 'https://www.programiz.com/python-programming/online-compiler/',
  'c++': 'https://www.programiz.com/cpp-programming/online-compiler/',
  cpp: 'https://www.programiz.com/cpp-programming/online-compiler/',
  java: 'https://www.programiz.com/java-programming/online-compiler/',
  javascript: 'https://www.programiz.com/javascript/online-compiler/',
  js: 'https://www.programiz.com/javascript/online-compiler/',
  c: 'https://www.programiz.com/c-programming/online-compiler/',
  csharp: 'https://www.programiz.com/csharp-programming/online-compiler/',
  'c#': 'https://www.programiz.com/csharp-programming/online-compiler/',
  php: 'https://www.programiz.com/php-script/online-compiler/'
};

export const DEFAULT_PROGRAMIZ_URL = 'https://www.programiz.com/python-programming/online-compiler/';

export const PROGRAMIZ_LANGUAGES = [
  { id: 'python', name: 'Python' },
  { id: 'cpp', name: 'C++' },
  { id: 'java', name: 'Java' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'c', name: 'C' }
];

export const getProgramizCompilerUrl = (langKey) => {
  if (!langKey) return DEFAULT_PROGRAMIZ_URL;
  const key = String(langKey).toLowerCase().trim();
  return PROGRAMIZ_COMPILER_URLS[key] || DEFAULT_PROGRAMIZ_URL;
};
