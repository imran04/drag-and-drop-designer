import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDesignSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.get("/api/designs", async (_req, res) => {
    const designs = await storage.listDesigns();
    res.json(designs);
  });

  app.get("/api/designs/:id", async (req, res) => {
    const design = await storage.getDesign(Number(req.params.id));
    if (!design) {
      res.status(404).json({ message: "Design not found" });
      return;
    }
    res.json(design);
  });

  app.post("/api/designs", async (req, res) => {
    const parsed = insertDesignSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid design data" });
      return;
    }
    const design = await storage.createDesign(parsed.data);
    res.json(design);
  });

  app.patch("/api/designs/:id", async (req, res) => {
    const parsed = insertDesignSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid design data" });
      return;
    }
    const design = await storage.updateDesign(Number(req.params.id), parsed.data);
    if (!design) {
      res.status(404).json({ message: "Design not found" });
      return;
    }
    res.json(design);
  });

  app.delete("/api/designs/:id", async (req, res) => {
    const success = await storage.deleteDesign(Number(req.params.id));
    if (!success) {
      res.status(404).json({ message: "Design not found" });
      return;
    }
    res.status(204).end();
  });

  const httpServer = createServer(app);
  return httpServer;
}
