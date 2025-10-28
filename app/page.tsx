"use client";

import Link from "next/link";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Card, CardBody } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { TOOL_GROUPS, CATEGORY_COLORS } from "./lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-1">
              小胖工具箱
            </h2>
            <p className="text-foreground/60 text-base">
              簡單實用的線上工具集合
            </p>
          </div>
        </section>

        {/* Tools Grid Section */}
        <section className="flex-1 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {TOOL_GROUPS.map((group) => (
              <div key={group.category} className="mb-12">
                {/* Category Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="text-2xl">{group.categoryEmoji}</span>
                    {group.categoryName}
                  </h3>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {group.tools.map((tool) => (
                    <Card
                      key={tool.id}
                      className="group"
                      hoverEffect={true}
                    >
                      <CardBody>
                        <div className="text-3xl mb-3">{tool.icon}</div>
                        <h4 className="text-base font-semibold text-foreground mb-1">
                          {tool.name}
                        </h4>
                        <p className="text-sm text-foreground/60 mb-4 line-clamp-2">
                          {tool.description}
                        </p>

                        {tool.comingSoon ? (
                          <div className="inline-block px-2 py-1 bg-secondary/20 text-secondary rounded text-xs font-medium">
                            敬請期待
                          </div>
                        ) : (
                          <Link href={tool.path} className="w-full">
                            <Button
                              variant="primary"
                              size="sm"
                              className="w-full"
                            >
                              打開
                            </Button>
                          </Link>
                        )}
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
