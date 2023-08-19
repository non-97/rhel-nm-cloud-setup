import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Vpc } from "./constructs/vpc";
import { Ec2Instance } from "./constructs/ec2-instance";

export class RhelStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new Vpc(this, "Vpc");

    // Zabbix Server
    const instanceA = new Ec2Instance(this, "Ec2InstanceA", {
      vpc: vpc.vpc,
    });

    instanceA.instance.connections.allowFrom(
      cdk.aws_ec2.Peer.anyIpv4(),
      cdk.aws_ec2.Port.allIcmp()
    );
  }
}
