resource "aws_eip" "ticket-eip" {
  instance = aws_instance.web.id
  vpc      = true
}
