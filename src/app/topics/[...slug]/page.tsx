import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedTopics, topicById } from "@/data/catalog";
import { topicContent } from "@/content/registry";
import { TopicReading } from "@/components/topic-reading";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedTopics.map((topic) => ({ slug: topic.slug.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = topicById.get(slug.join("/"));
  return topic ? { title: topic.title, description: topic.summary } : { title: "Topic not found" };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.join("/");
  const topic = topicById.get(key);
  const Content = topicContent[key as keyof typeof topicContent];
  if (!topic || !Content) notFound();
  return <TopicReading topic={topic}><Content /></TopicReading>;
}
