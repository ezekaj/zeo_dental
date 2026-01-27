-- Chat usage tracking for cost monitoring
CREATE TABLE IF NOT EXISTS chat_usage (
  id SERIAL PRIMARY KEY,
  input_tokens INTEGER NOT NULL,
  output_tokens INTEGER NOT NULL,
  total_tokens INTEGER NOT NULL,
  estimated_cost DECIMAL(10, 6) DEFAULT 0,
  language VARCHAR(5) DEFAULT 'sq',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for efficient date-based queries
CREATE INDEX IF NOT EXISTS idx_chat_usage_created_at ON chat_usage(created_at);

-- Index for aggregation queries
CREATE INDEX IF NOT EXISTS idx_chat_usage_date ON chat_usage(DATE(created_at));
