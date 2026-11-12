
# DevOps and Deployment Evolution

PlotTrade's deployment architecture has evolved from a simple platform-as-a-service setup into a more resilient AWS architecture. Each transition was driven by the need for stronger control, improved security, better separation of concerns, and a foundation for horizontal scaling.

## Approach 1: Vercel + Railway

The initial version of PlotTrade was deployed without Docker:

- The React frontend was deployed on **Vercel**.
- The Node.js/Express backend was deployed on **Railway**.
- The services were connected through environment-based configuration.
- Infrastructure management was intentionally minimal so that the application could be delivered quickly.

This approach was a practical starting point for validating the product and learning the operational requirements of the application before managing infrastructure directly.

### Tradeoffs

**Advantages**

- Very fast setup with minimal infrastructure work.
- Managed deployments, hosting, and platform-level maintenance.
- Convenient preview deployments and straightforward application delivery.
- Low operational overhead during early development.

**Limitations**

- Less control over networking, server configuration, and deployment topology.
- Scaling and security controls depend heavily on platform capabilities.
- Production behavior is more coupled to the hosting providers' deployment models.
- Container-level consistency and infrastructure reproducibility were limited.

## Approach 2: Dockerized Application on EC2 with Nginx

The next stage moved the complete application to an AWS EC2 instance using Dockerized containers for the frontend and backend. This deployment was implemented at commit [`856e8896da5a313eea9b41f23fcc4a9608eacacf`](https://github.com/zaidy-mughal/Plottrade/commit/856e8896da5a313eea9b41f23fcc4a9608eacacf).

The architecture included:

- Docker containers for both the frontend and backend.
- **Nginx** as a reverse proxy in front of the application containers.
- **Certbot** and Let's Encrypt certificates for HTTPS.
- **AWS Secrets Manager** for server-side secrets, retrieved using the EC2 instance's **IAM role** rather than hard-coded credentials.
- An EC2 security group allowing HTTP and HTTPS access publicly while restricting SSH access to my IP address.
- An **Elastic IP** attached to the EC2 instance.
- A custom **Name.com** domain pointed to the Elastic IP.

This stage provided direct control over the host, container runtime, networking, and TLS configuration while keeping the deployment understandable and compact.

### Tradeoffs

**Advantages**

- Full control over the server, Docker runtime, reverse proxy, and network rules.
- Consistent application packaging through Docker.
- Secrets were kept outside the codebase and accessed through IAM-based permissions.
- A fixed Elastic IP simplified DNS configuration.
- Nginx provided a familiar place to terminate TLS and route requests.

**Limitations**

- A single EC2 instance remained a single point of failure.
- Scaling required manual server changes and could cause downtime.
- Nginx, Certbot, certificate renewal, Docker processes, and host maintenance were operational responsibilities.
- Frontend and backend resources were coupled to the same host.
- The architecture had limited fault tolerance and no built-in load distribution.

## Approach 3: AWS ALB, Auto Scaling, S3, and CloudFront

The current deployment strategy separates the static frontend delivery path from the backend compute path:

- The frontend is built as static assets and deployed to **Amazon S3**.
- **Amazon CloudFront** serves the frontend globally and provides the public edge distribution.
- The custom **Name.com** domain is attached to the CloudFront distribution.
- The backend runs as a Dockerized Node.js server on EC2 instances.
- An **Application Load Balancer (ALB)** routes traffic to the backend through an **EC2 target group**.
- **Launch templates** define how backend instances are created and configured.
- An **Auto Scaling group (ASG)** manages backend instance capacity and replacement.
- Backend instances use a security group whose inbound access is limited to the ALB's security group, rather than exposing the application port directly to the internet.
- **AWS Certificate Manager (ACM)** manages the TLS certificate for the ALB/CloudFront delivery path.
- Nginx and Certbot were removed because AWS now handles the relevant load-balancing and certificate-management responsibilities.
- Server secrets continue to be stored in **AWS Secrets Manager** and accessed through IAM roles.

This approach is the result of progressively upgrading the deployment strategy: starting with platform-managed hosting, moving to containerized infrastructure, and then separating static delivery from scalable backend compute. It provides a clearer path toward high availability, controlled access, and independent scaling of frontend and backend workloads.

### Tradeoffs

**Advantages**

- Frontend assets are delivered efficiently through S3 and CloudFront.
- Backend instances can scale horizontally through the Auto Scaling group.
- The ALB provides health checks, traffic distribution, and instance replacement support.
- Backend instances are not directly exposed to public application traffic; access is controlled through security-group relationships.
- ACM removes the operational burden of manual certificate issuance and renewal.
- Frontend and backend can be deployed and scaled independently.
- Launch templates make instance configuration more repeatable and reproducible.

**Limitations**

- The architecture is more complex to configure and operate than Vercel/Railway or a single EC2 instance.
- AWS resources introduce additional cost and require ongoing monitoring.
- DNS, CloudFront, ACM, ALB, target groups, launch templates, ASGs, IAM, and security groups must be configured consistently.
- Deployments require coordination between frontend asset publishing and backend image rollout.
- Distributed infrastructure requires stronger observability, health checks, and incident-response practices.

### Security and Operations Principles

Across each iteration, the deployment approach has increasingly emphasized:

- **Least-privilege access:** IAM roles and security-group references are used instead of embedding credentials or broadly opening ports.
- **Secret isolation:** application secrets are stored in AWS Secrets Manager rather than committed to the repository.
- **Immutable packaging:** Docker images provide a repeatable backend runtime.
- **Controlled ingress:** public traffic enters through the intended HTTP/HTTPS edge or load-balancer layer, while SSH is restricted to administrative access.
- **Progressive improvement:** deployment decisions have been revisited as the application's reliability, security, and scaling requirements have grown.
