import type { Skill } from "@frinosoft/harness";
export type AIProvider = "openai" | "anthropic" | "minimax" | "gemini" | "ollama" | "openai-compatible";
export interface AIRequest {
    provider: AIProvider;
    model: string;
    prompt: string;
    system?: string;
    temperature?: number;
    maxTokens?: number;
}
export interface AIResponse {
    text: string;
    tokens: number;
    finishReason: string;
}
export declare const aiIntegrationSkill: Skill;
//# sourceMappingURL=index.d.ts.map