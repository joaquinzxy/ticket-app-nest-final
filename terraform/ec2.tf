resource "aws_instance" "web" {
  ami                         = "ami-0fe472d8a85bc7b0e"
  instance_type               = "t2.large"
  vpc_security_group_ids      = [aws_security_group.ticket-ec2-sg.id]
  subnet_id                   = module.vpc.public_subnets[0]
  user_data                   = file("user_data.sh")
  associate_public_ip_address = true
  tags = {
    Name    = "server--ticket-ec2-1"
    Owner   = "joaquin.desosa"
    Project = "terraform"
  }
}
