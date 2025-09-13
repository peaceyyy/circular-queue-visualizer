import React from 'react';
import { ENQUEUE_CODE, DEQUEUE_CODE } from '../constants';
import { ActionType } from '../types';

interface CodeDisplayProps {
    highlightedLine: number | null;
    activeAction: ActionType;
}

const SyntaxHighlighter: React.FC<{ line: string }> = ({ line }) => {
    const placeholders: { [key: string]: string } = {};
    let placeholderId = 0;

    // 1. Isolate comments and strings with placeholders to prevent nested highlighting
    let processedLine = line
        .replace(/(\/\/.*)/g, (match) => {
            const id = `__COMMENT_${placeholderId}__`;
            placeholders[id] = `<span class="text-green-600 dark:text-green-400 italic">${match}</span>`;
            placeholderId++;
            return id;
        })
        .replace(/(".*?")/g, (match) => {
            const id = `__STRING_${placeholderId}__`;
            placeholders[id] = `<span class="text-orange-600 dark:text-orange-400">${match}</span>`;
            placeholderId++;
            return id;
        });

    // 2. Highlight keywords, types, and functions on the sanitized line
    processedLine = processedLine
        .replace(/\b(void|if|else)\b/g, `<span class="text-blue-600 dark:text-blue-400 font-semibold">$1</span>`)
        .replace(/\b(CircularQueue|char)\b/g, `<span class="text-teal-600 dark:text-teal-500">$1</span>`)
        .replace(/\b(printf)\b/g, `<span class="text-purple-600 dark:text-purple-400">$1</span>`);


    let finalLine = processedLine;
    for (const id in placeholders) {
        finalLine = finalLine.replace(id, placeholders[id]);
    }

    return <span dangerouslySetInnerHTML={{ __html: finalLine }} />;
};


const CodeBlock: React.FC<{ title: string, code: string, isActionActive: boolean, highlightedLine: number | null }> = ({ title, code, isActionActive, highlightedLine }) => {
    const lines = code.split('\n');
    return (
        <div className="bg-gray-100 dark:bg-gray-900/50 rounded-lg flex flex-col h-full shadow-inner overflow-hidden">
            {/* IDE-style Title Bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800/80 border-b border-gray-300 dark:border-gray-700">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex-grow text-center">{title}.c</h3>
            </div>
            
            <pre className="text-base font-mono whitespace-pre-wrap flex-grow overflow-auto p-4">
                {lines.map((line, index) => {
                    const lineNumber = index + 1;
                    const isHighlighted = isActionActive && lineNumber === highlightedLine;
                    return (
                        <div key={index} className={`flex transition-colors duration-200 ${isHighlighted ? 'bg-teal-500/20 dark:bg-teal-500/30' : 'bg-transparent'}`}>
                           <span className="inline-block w-10 text-right text-gray-400 dark:text-gray-500 pr-4 select-none">{lineNumber}</span>
                           <code className="flex-1">
                                <SyntaxHighlighter line={line} />
                           </code>
                        </div>
                    );
                })}
            </pre>
        </div>
    );
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ highlightedLine, activeAction }) => {
    return (
        <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl shadow-md flex-grow flex flex-col">
            <h2 className="text-xl font-bold text-teal-600 dark:text-teal-400 border-b-2 border-gray-300 dark:border-gray-700 pb-2 mb-4">Code Implementation</h2>
            <div className="flex flex-col gap-4 flex-grow">
                <CodeBlock 
                    title="enqueue"
                    code={ENQUEUE_CODE}
                    isActionActive={activeAction === ActionType.ENQUEUE}
                    highlightedLine={highlightedLine}
                />
                <CodeBlock 
                    title="dequeue"
                    code={DEQUEUE_CODE}
                    isActionActive={activeAction === ActionType.DEQUEUE}
                    highlightedLine={highlightedLine}
                />
            </div>
        </div>
    );
};

export default CodeDisplay;