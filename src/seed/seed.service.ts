import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { User } from 'src/auth/entities/user.entity';
import { FileManagmentService } from 'src/file-managment/file-managment.service';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { TicketsService } from 'src/tickets/tickets.service';
import { Repository } from 'typeorm';
import { initialData } from './data/initial-data';

@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly ticketService: TicketsService,
    private readonly fileManagmentService: FileManagmentService,
  ) {

  }

  async runSeed(files: { csvFile: Express.Multer.File[], imageFile: Express.Multer.File[] }) {
    await this.deleteTables();

    const usersInserted = await this.insertUsers();

    try {
      await this.insertNewTickets(usersInserted, files);
    } catch (error) {
      console.log(error);

    }

    return 'SEED EXECUTED';
  }

  private async deleteTables() {

    const deletedTickets = await this.ticketsRepository.delete({})
    const deletedUsers = await this.userRepository.delete({})

  }

  private async insertUsers() {

    const seedUsers = initialData.usersSeedData;

    const users: User[] = [];

    seedUsers.forEach(user => {
      users.push(this.userRepository.create({
        ...user,
        password: hashSync(user.password, 10)
      }))
    });

    const dbUsers = await this.userRepository.save(users)

    return dbUsers;
  }


  private async insertNewTickets(users: User[], files: { csvFile: Express.Multer.File[], imageFile: Express.Multer.File[] }) {

    const { csvFile, imageFile } = files;

    const csvFileContent = this.fileManagmentService.uploadCSV(csvFile[0])
    const imageUrlS3 = await this.fileManagmentService.uploadImage(imageFile[0], 'seed-image')

    const products = initialData.ticketsSeedData;

    const insertPromises = [];

    products.forEach(ticket => {
      const user = users[Math.floor(Math.random() * users.length)]

      const ticketBeforeInsert = this.ticketsRepository.create({
        ...ticket,
        orderDetail: csvFileContent,
        imageProductUrl: imageUrlS3,
        user
      })

      const ticketDB = this.ticketsRepository.save(ticketBeforeInsert)

      insertPromises.push(ticketDB)
    });

    await Promise.all(insertPromises);

    return true;
  }

}
