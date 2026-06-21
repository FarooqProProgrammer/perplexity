"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Paperclip, Globe, StopCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ModelSelector,
  ModelSelectorTrigger,
  ModelSelectorContent,
  ModelSelectorList,
  ModelSelectorGroup,
  ModelSelectorItem,
  ModelSelectorLogo,
  ModelSelectorName,
  ModelSelectorInput,
} from "@/components/ai-elements/model-selector";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_MODELS = [
  { id: "openai/gpt-4o-mini", name: "GPT-4o Mini", provider: "openai" },
  { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "anthropic" },
  { id: "google/gemini-flash-1.5", name: "Gemini 1.5 Flash", provider: "google" },
  { id: "meta-llama/llama-3-8b-instruct", name: "Llama 3", provider: "llama" },
  { id: "openrouter/auto", name: "Auto (Best Model)", provider: "openrouter" },
];

const PROVIDER_NAMES: Record<string, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Google",
  llama: "Meta Llama",
  openrouter: "OpenRouter",
  mistral: "Mistral",
  cohere: "Cohere",
  xai: "xAI",
  deepseek: "DeepSeek",
  perplexity: "Perplexity",
};

export default function Home() {
  const { messages, input = "", setInput, handleInputChange, handleSubmit, isLoading, stop } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedModelId, setSelectedModelId] = useState(DEFAULT_MODELS[0].id);

  // Use React Query to fetch all OpenRouter models dynamically
  const { data: openRouterModels } = useQuery({
    queryKey: ["openRouterModels"],
    queryFn: async () => {
      const res = await fetch("https://openrouter.ai/api/v1/models");
      const json = await res.json();
      return json.data.map((m: any) => {
        // Parse provider
        const rawProvider = m.id.split("/")[0];
        const provider = rawProvider === "meta-llama" ? "llama" : rawProvider;
        
        // Clean up the name (e.g., remove "OpenAI: " prefix if present to make it cleaner)
        let cleanName = m.name;
        if (cleanName.toLowerCase().startsWith(rawProvider.toLowerCase() + ": ")) {
          cleanName = cleanName.slice(rawProvider.length + 2);
        }
        
        return {
          id: m.id,
          name: cleanName,
          provider,
        };
      });
    },
    staleTime: 1000 * 60 * 60, // cache for 1 hour
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // ONLY use fetched models after mounting to prevent hydration mismatch
  const models = mounted && openRouterModels && openRouterModels.length > 0 ? openRouterModels : DEFAULT_MODELS;
  const selectedModel = models.find((m: any) => m.id === selectedModelId) || models[0];

  // Group models by provider
  const groupedModels = models.reduce((acc: any, model: any) => {
    if (!acc[model.provider]) acc[model.provider] = [];
    acc[model.provider].push(model);
    return acc;
  }, {});

  const modelSelectorElement = (
    <ModelSelector>
      <ModelSelectorTrigger asChild>
        <Button type="button" variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100" suppressHydrationWarning>
          <ModelSelectorLogo provider={selectedModel.provider as any} />
          <span className="text-xs font-medium hidden sm:inline">
            {selectedModel.name}
          </span>
        </Button>
      </ModelSelectorTrigger>
      <ModelSelectorContent>
        <ModelSelectorInput placeholder="Search models..." />
        <ModelSelectorList>
          {Object.entries(groupedModels).map(([provider, providerModels]: [string, any]) => (
            <ModelSelectorGroup 
              key={provider} 
              heading={PROVIDER_NAMES[provider] || provider.charAt(0).toUpperCase() + provider.slice(1)}
            >
              {providerModels.map((model: any) => (
                <ModelSelectorItem 
                  key={model.id} 
                  onSelect={() => setSelectedModelId(model.id)}
                >
                  <ModelSelectorLogo provider={model.provider as any} />
                  <ModelSelectorName>{model.name}</ModelSelectorName>
                </ModelSelectorItem>
              ))}
            </ModelSelectorGroup>
          ))}
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  );

  if (messages.length > 0) {
    return (
      <div className="flex h-full w-full flex-col bg-background">
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full pb-32">
          {messages.map(m => (
            <div key={m.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {m.role === 'user' ? (
                  <Avatar className="size-6">
                    <AvatarFallback className="bg-zinc-200 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">U</AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="size-6">
                    <AvatarFallback className="bg-teal-500 text-xs text-white">AI</AvatarFallback>
                  </Avatar>
                )}
                <span className="font-semibold text-sm">
                  {m.role === 'user' ? 'You' : 'Perplexity'}
                </span>
              </div>
              <div className="pl-8 text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
                {m.content}
              </div>
            </div>
          ))}
        </main>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pointer-events-none md:left-[var(--sidebar-width)] transition-all duration-300">
          <div className="max-w-3xl mx-auto w-full pointer-events-auto">
            <form onSubmit={handleSubmit} className="w-full relative group">
              <div className="flex flex-col w-full rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:ring-zinc-800/50">
                <Input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask anything..."
                  className="min-h-[50px] w-full border-0 bg-transparent px-4 py-3 text-base shadow-none outline-none focus-visible:ring-0"
                />

                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                      <Globe className="size-4" />
                      <span className="text-xs font-medium hidden sm:inline">Focus</span>
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                      <Paperclip className="size-4" />
                      <span className="text-xs font-medium hidden sm:inline">Attach</span>
                    </Button>
                    {modelSelectorElement}
                  </div>
                  {isLoading ? (
                    <Button type="button" onClick={stop} size="icon" className="size-8 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                      <StopCircle className="size-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={!input?.trim()} size="icon" className="size-8 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50">
                      <ArrowRight className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4 bg-background">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8">
        <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 text-center">
          Where knowledge begins
        </h1>

        <div className="w-full relative group">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:ring-zinc-800/50">
              <Input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask anything..."
                className="min-h-[60px] w-full border-0 bg-transparent px-4 py-4 text-base md:text-lg shadow-none outline-none focus-visible:ring-0"
              />

              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                    <Globe className="size-4" />
                    <span className="text-xs font-medium">Focus</span>
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                    <Paperclip className="size-4" />
                    <span className="text-xs font-medium">Attach</span>
                  </Button>
                  {modelSelectorElement}
                </div>
                <Button type="submit" disabled={!input?.trim()} size="icon" className="size-8 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50">
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {["Latest tech news", "Explain quantum physics", "Healthy dinner recipes", "Write a python script"].map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              onClick={() => handleInputChange({ target: { value: suggestion } } as React.ChangeEvent<HTMLInputElement>)}
              className="rounded-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-sm font-normal text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
}
