# Secret Store

Secret Store is a zero-knowledge secret sharing system that allows for securely sharing secrets between parties. The system uses a combination of cryptographic primitives and protocols to ensure that the shared secrets are not revealed to any unauthorized parties.

## Running

```bash
docker run -p 3000:3000 keganhollern/secret-store
```

## Configuration

You can change the port by using the environment variable `PORT`

```bash
docker run -p 80:80 --env PORT=80 keganhollern/secret-store
```

## TODO

- [ ] finish readme documentation
- [ ] link docker image
- [ ] introduce persistence (mongo?)
- [ ] mobile support with save button banner or something
