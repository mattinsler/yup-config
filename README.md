# yup-config

Validate configuration objects using [yup](https://www.npmjs.com/package/yup).

## Usage

```typescript
import * as Config from 'yup-config';

const ConfigSchema = {
  http: Config.object({
    port: Config.number().integer().default(3000),
  }),
};

// load & validate directly from a file
const config = Config.loadConfig('path/to-config.json', ConfigSchema);

// validate from an object
Config.getConfig({ http: { port: 3000 } }, ConfigSchema);
```
