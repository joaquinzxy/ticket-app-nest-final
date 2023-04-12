output "swagger_ip" {
  description = "Dirección IP de Swagger"
  value       = "http://${aws_eip.ticket-eip.public_ip}:3000/api/docs"
}


output "elastic_ip" {
  description = "Dirección IP elástica"
  value       = "http://${aws_eip.ticket-eip.public_ip}:3000/"
}
