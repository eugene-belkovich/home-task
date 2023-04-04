# Notes

- I used SOLID, DRY, KISS principles
- I decompose functionality by modules and tried to keep them as simple as possible
- I used IntelliJ http client for testing API
- I used Postman for API developement by can't share it because it's not free
- I skip majority of e2e and service tests because I don't have enough time. I wrote several to show my skills.
- - I skip majority of swagger coverage becaise I don't have enough time. I wrote several to show my skills.

# Ideas

Possible improvements:

- I would like improve REST API endpoints naming.

  - GET http://api.example.com/v1/groups - get all groups
  - GET http://api.example.com/v1/groups/{:group}/instances or http://api.example.com/v1/instances/?group={:group}/ - get all instances by group name
  - POST http://api.example.com/v1/groups/{:group}/instances/{:instance} or http://api.example.com/v1/groups/?group={:group}&instance={:instance}/ or http://api.example.com/v1/register/?group={:group}&instance={:instance}/ - register instance in group
  - DELETE http://api.example.com/v1/groups/{:group}/instances/{:instance} or http://api.example.com/v1/groups/?group={:group}&instance={:instance}/ or http://api.example.com/v1/register/?group={:group}&instance={:instance}/ - unregister instance from group

- I would like improve relationship between groups and instances. I would like to use one-to-many relationship between groups and instances. It possible if pass the group_id to the instance schema and array of instance_id to the group schema.
- I would like improve DI usage. Better to use interfaces instead of specific service for typing + @Inject(key) where key its string with service name"ServiceName".

```ts
export class DavinciCommonDITokens {
  public static readonly DiscoveryService: unique symbol = Symbol('DiscoveryService');
}

export const providers: Provider[] = [
  {
    provide: DiscoveryDITokens.DiscoveryService,
    useClass: DiscoveryService,
  },
]

@Module({
  controllers: [DiscoveryController],
  providers: [
    ...providers,
  ],
  exports: [],
})
export class DiscoveryModule {}

export interface IDiscoveryService{}

export class DiscoveryController {
  private readonly logger = new Logger(ExhibitsController.name);

  constructor(@Inject(DiscoveryDITokens.DiscoveryService)
              private readonly discoveryService: IDiscoveryService){}
```

- I would like improve error handling by using custom error classes and error handler middleware and make response more informative.
- I would like improve logging. I would like to use custom logger and make logs more informative.
- I would like improve swagger documentation. I would like to use swagger for API documentation and generate it automatically.
- I would like improve API security by using JWT or OAuth2.
- I would like improve API rate limiting. I would like to use API rate limiting. I would like to use nestjs rate limiting.
