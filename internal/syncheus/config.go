package syncheus

import "fmt"

type Config struct {
	Port int
}

func (c *Config) parse() (*Config, error) {
	if c.Port < 3000 || c.Port > 9999 {
		return nil, fmt.Errorf("invalid syncheus '%d' port number", c.Port)
	}
	return c, nil
}
