# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### RDSDatabaseRunningScheduler <a name="RDSDatabaseRunningScheduler" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler"></a>

CDK construct that provisions a durable Lambda workflow and EventBridge schedules to start/stop tagged RDS databases and clusters.

#### Initializers <a name="Initializers" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.Initializer"></a>

```typescript
import { RDSDatabaseRunningScheduler } from 'aws-rds-database-running-scheduler'

new RDSDatabaseRunningScheduler(scope: Construct, id: string, props: RDSDatabaseRunningSchedulerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | Parent construct scope. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.Initializer.parameter.id">id</a></code> | <code>string</code> | Construct identifier. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.Initializer.parameter.props">props</a></code> | <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps">RDSDatabaseRunningSchedulerProps</a></code> | Scheduler configuration. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

Parent construct scope.

---

##### `id`<sup>Required</sup> <a name="id" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.Initializer.parameter.id"></a>

- *Type:* string

Construct identifier.

---

##### `props`<sup>Required</sup> <a name="props" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.Initializer.parameter.props"></a>

- *Type:* <a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps">RDSDatabaseRunningSchedulerProps</a>

Scheduler configuration.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.isConstruct"></a>

```typescript
import { RDSDatabaseRunningScheduler } from 'aws-rds-database-running-scheduler'

RDSDatabaseRunningScheduler.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduler.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### RDSDatabaseRunningScheduleStack <a name="RDSDatabaseRunningScheduleStack" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack"></a>

CDK stack that provisions scheduled start/stop control for tagged RDS resources.

#### Initializers <a name="Initializers" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.Initializer"></a>

```typescript
import { RDSDatabaseRunningScheduleStack } from 'aws-rds-database-running-scheduler'

new RDSDatabaseRunningScheduleStack(scope: Construct, id: string, props: RDSDatabaseRunningScheduleStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | Parent construct scope. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.Initializer.parameter.id">id</a></code> | <code>string</code> | Stack identifier. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.Initializer.parameter.props">props</a></code> | <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps">RDSDatabaseRunningScheduleStackProps</a></code> | Stack configuration. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

Parent construct scope.

---

##### `id`<sup>Required</sup> <a name="id" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.Initializer.parameter.id"></a>

- *Type:* string

Stack identifier.

---

##### `props`<sup>Required</sup> <a name="props" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.Initializer.parameter.props"></a>

- *Type:* <a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps">RDSDatabaseRunningScheduleStackProps</a>

Stack configuration.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addMetadata">addMetadata</a></code> | Adds an arbitrary key-value pair, with information you want to record about the stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addStackTag">addStackTag</a></code> | Configure a stack tag. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.removeStackTag">removeStackTag</a></code> | Remove a stack tag. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |

---

##### `toString` <a name="toString" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `addDependency` <a name="addDependency" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitrary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addStackTag` <a name="addStackTag" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addStackTag"></a>

```typescript
public addStackTag(tagName: string, tagValue: string): void
```

Configure a stack tag.

At deploy time, CloudFormation will automatically apply all stack tags to all resources in the stack.

###### `tagName`<sup>Required</sup> <a name="tagName" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addStackTag.parameter.tagName"></a>

- *Type:* string

---

###### `tagValue`<sup>Required</sup> <a name="tagValue" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addStackTag.parameter.tagValue"></a>

- *Type:* string

---

##### `addTransform` <a name="addTransform" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

**Deployment 1: break the relationship**:

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

**Deployment 2: remove the bucket resource**:

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `removeStackTag` <a name="removeStackTag" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.removeStackTag"></a>

```typescript
public removeStackTag(tagName: string): void
```

Remove a stack tag.

At deploy time, CloudFormation will automatically apply all stack tags to all resources in the stack.

###### `tagName`<sup>Required</sup> <a name="tagName" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.removeStackTag.parameter.tagName"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### `isConstruct` <a name="isConstruct" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.isConstruct"></a>

```typescript
import { RDSDatabaseRunningScheduleStack } from 'aws-rds-database-running-scheduler'

RDSDatabaseRunningScheduleStack.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.isStack"></a>

```typescript
import { RDSDatabaseRunningScheduleStack } from 'aws-rds-database-running-scheduler'

RDSDatabaseRunningScheduleStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.of"></a>

```typescript
import { RDSDatabaseRunningScheduleStack } from 'aws-rds-database-running-scheduler'

RDSDatabaseRunningScheduleStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |

---

##### `node`<sup>Required</sup> <a name="node" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into an **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other account-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---


## Structs <a name="Structs" id="Structs"></a>

### RDSDatabaseRunningSchedulerProps <a name="RDSDatabaseRunningSchedulerProps" id="aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps"></a>

Properties for the RDS database running scheduler construct.

#### Initializer <a name="Initializer" id="aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps.Initializer"></a>

```typescript
import { RDSDatabaseRunningSchedulerProps } from 'aws-rds-database-running-scheduler'

const rDSDatabaseRunningSchedulerProps: RDSDatabaseRunningSchedulerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps.property.secrets">secrets</a></code> | <code><a href="#aws-rds-database-running-scheduler.Secrets">Secrets</a></code> | Secret references used by the Lambda workflow. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps.property.targetResource">targetResource</a></code> | <code><a href="#aws-rds-database-running-scheduler.TargetResource">TargetResource</a></code> | Tag filter to select RDS instances and clusters. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps.property.enableScheduling">enableScheduling</a></code> | <code>boolean</code> | Enables or disables both start and stop schedules. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps.property.startSchedule">startSchedule</a></code> | <code><a href="#aws-rds-database-running-scheduler.Schedule">Schedule</a></code> | Optional override for start schedule cron configuration. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps.property.stopSchedule">stopSchedule</a></code> | <code><a href="#aws-rds-database-running-scheduler.Schedule">Schedule</a></code> | Optional override for stop schedule cron configuration. |

---

##### `secrets`<sup>Required</sup> <a name="secrets" id="aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps.property.secrets"></a>

```typescript
public readonly secrets: Secrets;
```

- *Type:* <a href="#aws-rds-database-running-scheduler.Secrets">Secrets</a>

Secret references used by the Lambda workflow.

---

##### `targetResource`<sup>Required</sup> <a name="targetResource" id="aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps.property.targetResource"></a>

```typescript
public readonly targetResource: TargetResource;
```

- *Type:* <a href="#aws-rds-database-running-scheduler.TargetResource">TargetResource</a>

Tag filter to select RDS instances and clusters.

---

##### `enableScheduling`<sup>Optional</sup> <a name="enableScheduling" id="aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps.property.enableScheduling"></a>

```typescript
public readonly enableScheduling: boolean;
```

- *Type:* boolean

Enables or disables both start and stop schedules.

---

##### `startSchedule`<sup>Optional</sup> <a name="startSchedule" id="aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps.property.startSchedule"></a>

```typescript
public readonly startSchedule: Schedule;
```

- *Type:* <a href="#aws-rds-database-running-scheduler.Schedule">Schedule</a>

Optional override for start schedule cron configuration.

---

##### `stopSchedule`<sup>Optional</sup> <a name="stopSchedule" id="aws-rds-database-running-scheduler.RDSDatabaseRunningSchedulerProps.property.stopSchedule"></a>

```typescript
public readonly stopSchedule: Schedule;
```

- *Type:* <a href="#aws-rds-database-running-scheduler.Schedule">Schedule</a>

Optional override for stop schedule cron configuration.

---

### RDSDatabaseRunningScheduleStackProps <a name="RDSDatabaseRunningScheduleStackProps" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps"></a>

Properties for the RDS database running schedule stack.

#### Initializer <a name="Initializer" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.Initializer"></a>

```typescript
import { RDSDatabaseRunningScheduleStackProps } from 'aws-rds-database-running-scheduler'

const rDSDatabaseRunningScheduleStackProps: RDSDatabaseRunningScheduleStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.crossRegionReferences">crossRegionReferences</a></code> | <code>boolean</code> | Enable this flag to allow native cross region stack references. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | SNS Topic ARNs that will receive stack events. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.permissionsBoundary">permissionsBoundary</a></code> | <code>aws-cdk-lib.PermissionsBoundary</code> | Options for applying a permissions boundary to all IAM Roles and Users created within this Stage. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.propertyInjectors">propertyInjectors</a></code> | <code>aws-cdk-lib.IPropertyInjector[]</code> | A list of IPropertyInjector attached to this Stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.suppressTemplateIndentation">suppressTemplateIndentation</a></code> | <code>boolean</code> | Enable this flag to suppress indentation in generated CloudFormation templates. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Tags that will be applied to the Stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.secrets">secrets</a></code> | <code><a href="#aws-rds-database-running-scheduler.Secrets">Secrets</a></code> | Secret references required by the scheduler construct. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.targetResource">targetResource</a></code> | <code><a href="#aws-rds-database-running-scheduler.TargetResource">TargetResource</a></code> | Tag filter used to select target RDS resources. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.enableScheduling">enableScheduling</a></code> | <code>boolean</code> | Enables or disables schedule creation. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.startSchedule">startSchedule</a></code> | <code><a href="#aws-rds-database-running-scheduler.Schedule">Schedule</a></code> | Optional cron configuration for start operations. |
| <code><a href="#aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.stopSchedule">stopSchedule</a></code> | <code><a href="#aws-rds-database-running-scheduler.Schedule">Schedule</a></code> | Optional cron configuration for stop operations. |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `crossRegionReferences`<sup>Optional</sup> <a name="crossRegionReferences" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.crossRegionReferences"></a>

```typescript
public readonly crossRegionReferences: boolean;
```

- *Type:* boolean
- *Default:* false

Enable this flag to allow native cross region stack references.

Enabling this will create a CloudFormation custom resource
in both the producing stack and consuming stack in order to perform the export/import

This feature is currently experimental

---

##### `description`<sup>Optional</sup> <a name="description" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment
- *Default:* The environment of the containing `Stage` if available, otherwise create the stack will be environment-agnostic.

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to
select the indicated environment (recommended for production stacks), or to
the values of environment variables
`CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
depend on the AWS credentials/configuration that the CDK CLI is executed
under (recommended for development stacks).

If the `Stack` is instantiated inside a `Stage`, any undefined
`region`/`account` fields from `env` will default to the same field on the
encompassing `Stage`, if configured there.

If either `region` or `account` are not set nor inherited from `Stage`, the
Stack will be considered "*environment-agnostic*"". Environment-agnostic
stacks can be deployed to any environment but may not be able to take
advantage of all features of the CDK. For example, they will not be able to
use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
automatically translate Service Principals to the right format based on the
environment's AWS partition, and other such enhancements.

---

*Example*

```typescript
// Use a concrete account and region to deploy this stack to:
// `.account` and `.region` will simply return these values.
new Stack(app, 'Stack1', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  },
});

// Use the CLI's current credentials to determine the target environment:
// `.account` and `.region` will reflect the account+region the CLI
// is configured to use (based on the user CLI credentials)
new Stack(app, 'Stack2', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

// Define multiple stacks stage associated with an environment
const myStage = new Stage(app, 'MyStage', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  }
});

// both of these stacks will use the stage's account/region:
// `.account` and `.region` will resolve to the concrete values as above
new MyStack(myStage, 'Stack1');
new YourStack(myStage, 'Stack2');

// Define an environment-agnostic stack:
// `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
// which will only resolve to actual values by CloudFormation during deployment.
new MyStack(app, 'Stack1');
```


##### `notificationArns`<sup>Optional</sup> <a name="notificationArns" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]
- *Default:* no notification arns.

SNS Topic ARNs that will receive stack events.

---

##### `permissionsBoundary`<sup>Optional</sup> <a name="permissionsBoundary" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.permissionsBoundary"></a>

```typescript
public readonly permissionsBoundary: PermissionsBoundary;
```

- *Type:* aws-cdk-lib.PermissionsBoundary
- *Default:* no permissions boundary is applied

Options for applying a permissions boundary to all IAM Roles and Users created within this Stage.

---

##### `propertyInjectors`<sup>Optional</sup> <a name="propertyInjectors" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.propertyInjectors"></a>

```typescript
public readonly propertyInjectors: IPropertyInjector[];
```

- *Type:* aws-cdk-lib.IPropertyInjector[]
- *Default:* no PropertyInjectors

A list of IPropertyInjector attached to this Stack.

---

##### `stackName`<sup>Optional</sup> <a name="stackName" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `suppressTemplateIndentation`<sup>Optional</sup> <a name="suppressTemplateIndentation" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.suppressTemplateIndentation"></a>

```typescript
public readonly suppressTemplateIndentation: boolean;
```

- *Type:* boolean
- *Default:* the value of `@aws-cdk/core:suppressTemplateIndentation`, or `false` if that is not set.

Enable this flag to suppress indentation in generated CloudFormation templates.

If not specified, the value of the `@aws-cdk/core:suppressTemplateIndentation`
context key will be used. If that is not specified, then the
default value `false` will be used.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* The synthesizer specified on `App`, or `DefaultStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

The Stack Synthesizer controls aspects of synthesis and deployment,
like how assets are referenced and what IAM roles to use. For more
information, see the README of the main CDK package.

If not specified, the `defaultStackSynthesizer` from `App` will be used.
If that is not specified, `DefaultStackSynthesizer` is used if
`@aws-cdk/core:newStyleStackSynthesis` is set to `true` or the CDK major
version is v2. In CDK v1 `LegacyStackSynthesizer` is the default if no
other synthesizer is specified.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Tags that will be applied to the Stack.

These tags are applied to the CloudFormation Stack itself. They will not
appear in the CloudFormation template.

However, at deployment time, CloudFormation will apply these tags to all
resources in the stack that support tagging. You will not be able to exempt
resources from tagging (using the `excludeResourceTypes` property of
`Tags.of(...).add()`) for tags applied in this way.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `secrets`<sup>Required</sup> <a name="secrets" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.secrets"></a>

```typescript
public readonly secrets: Secrets;
```

- *Type:* <a href="#aws-rds-database-running-scheduler.Secrets">Secrets</a>

Secret references required by the scheduler construct.

---

##### `targetResource`<sup>Required</sup> <a name="targetResource" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.targetResource"></a>

```typescript
public readonly targetResource: TargetResource;
```

- *Type:* <a href="#aws-rds-database-running-scheduler.TargetResource">TargetResource</a>

Tag filter used to select target RDS resources.

---

##### `enableScheduling`<sup>Optional</sup> <a name="enableScheduling" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.enableScheduling"></a>

```typescript
public readonly enableScheduling: boolean;
```

- *Type:* boolean

Enables or disables schedule creation.

---

##### `startSchedule`<sup>Optional</sup> <a name="startSchedule" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.startSchedule"></a>

```typescript
public readonly startSchedule: Schedule;
```

- *Type:* <a href="#aws-rds-database-running-scheduler.Schedule">Schedule</a>

Optional cron configuration for start operations.

---

##### `stopSchedule`<sup>Optional</sup> <a name="stopSchedule" id="aws-rds-database-running-scheduler.RDSDatabaseRunningScheduleStackProps.property.stopSchedule"></a>

```typescript
public readonly stopSchedule: Schedule;
```

- *Type:* <a href="#aws-rds-database-running-scheduler.Schedule">Schedule</a>

Optional cron configuration for stop operations.

---

### Schedule <a name="Schedule" id="aws-rds-database-running-scheduler.Schedule"></a>

Cron schedule settings for EventBridge Scheduler.

#### Initializer <a name="Initializer" id="aws-rds-database-running-scheduler.Schedule.Initializer"></a>

```typescript
import { Schedule } from 'aws-rds-database-running-scheduler'

const schedule: Schedule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-rds-database-running-scheduler.Schedule.property.timezone">timezone</a></code> | <code>aws-cdk-lib.TimeZone</code> | Time zone used to interpret cron fields. |
| <code><a href="#aws-rds-database-running-scheduler.Schedule.property.hour">hour</a></code> | <code>string</code> | Hour field in cron expression. |
| <code><a href="#aws-rds-database-running-scheduler.Schedule.property.minute">minute</a></code> | <code>string</code> | Minute field in cron expression. |
| <code><a href="#aws-rds-database-running-scheduler.Schedule.property.week">week</a></code> | <code>string</code> | Weekday field in cron expression. |

---

##### `timezone`<sup>Required</sup> <a name="timezone" id="aws-rds-database-running-scheduler.Schedule.property.timezone"></a>

```typescript
public readonly timezone: TimeZone;
```

- *Type:* aws-cdk-lib.TimeZone

Time zone used to interpret cron fields.

---

##### `hour`<sup>Optional</sup> <a name="hour" id="aws-rds-database-running-scheduler.Schedule.property.hour"></a>

```typescript
public readonly hour: string;
```

- *Type:* string

Hour field in cron expression.

---

##### `minute`<sup>Optional</sup> <a name="minute" id="aws-rds-database-running-scheduler.Schedule.property.minute"></a>

```typescript
public readonly minute: string;
```

- *Type:* string

Minute field in cron expression.

---

##### `week`<sup>Optional</sup> <a name="week" id="aws-rds-database-running-scheduler.Schedule.property.week"></a>

```typescript
public readonly week: string;
```

- *Type:* string

Weekday field in cron expression.

---

### Secrets <a name="Secrets" id="aws-rds-database-running-scheduler.Secrets"></a>

Secret names required by the scheduler workflow.

#### Initializer <a name="Initializer" id="aws-rds-database-running-scheduler.Secrets.Initializer"></a>

```typescript
import { Secrets } from 'aws-rds-database-running-scheduler'

const secrets: Secrets = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-rds-database-running-scheduler.Secrets.property.slackSecretName">slackSecretName</a></code> | <code>string</code> | Name of the Slack API secret in AWS Secrets Manager. |

---

##### `slackSecretName`<sup>Required</sup> <a name="slackSecretName" id="aws-rds-database-running-scheduler.Secrets.property.slackSecretName"></a>

```typescript
public readonly slackSecretName: string;
```

- *Type:* string

Name of the Slack API secret in AWS Secrets Manager.

---

### TargetResource <a name="TargetResource" id="aws-rds-database-running-scheduler.TargetResource"></a>

Tag filter used to discover target RDS resources.

#### Initializer <a name="Initializer" id="aws-rds-database-running-scheduler.TargetResource.Initializer"></a>

```typescript
import { TargetResource } from 'aws-rds-database-running-scheduler'

const targetResource: TargetResource = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-rds-database-running-scheduler.TargetResource.property.tagKey">tagKey</a></code> | <code>string</code> | Tag key used for resource discovery. |
| <code><a href="#aws-rds-database-running-scheduler.TargetResource.property.tagValues">tagValues</a></code> | <code>string[]</code> | Tag values matched by the scheduler target query. |

---

##### `tagKey`<sup>Required</sup> <a name="tagKey" id="aws-rds-database-running-scheduler.TargetResource.property.tagKey"></a>

```typescript
public readonly tagKey: string;
```

- *Type:* string

Tag key used for resource discovery.

---

##### `tagValues`<sup>Required</sup> <a name="tagValues" id="aws-rds-database-running-scheduler.TargetResource.property.tagValues"></a>

```typescript
public readonly tagValues: string[];
```

- *Type:* string[]

Tag values matched by the scheduler target query.

---



