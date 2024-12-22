// Simple in-memory store for secrets
interface Secret {
    encryptedData: string;
    createdAt: Date;
  }
  
  class MemoryStore {
    private secrets: Map<string, Secret> = new Map();
  
    store(id: string, encryptedData: string): void {
      this.secrets.set(id, {
        encryptedData,
        createdAt: new Date()
      });
    }
  
    retrieve(id: string): Secret | undefined {
      const secret = this.secrets.get(id);
      if (secret) {
        // Delete after retrieval (one-time use)
        this.secrets.delete(id);
      }
      return secret;
    }
  
    // Optional: cleanup old secrets (unused for now)
    cleanup(maxAgeMs: number = 24 * 60 * 60 * 1000): void {
      const now = new Date();
      // Convert to array for compatibility
      Array.from(this.secrets.keys()).forEach(id => {
        const secret = this.secrets.get(id);
        if (secret && now.getTime() - secret.createdAt.getTime() > maxAgeMs) {
          this.secrets.delete(id);
        }
      });
    }
  }
  
  // Export a singleton instance
  export const secretStore = new MemoryStore();