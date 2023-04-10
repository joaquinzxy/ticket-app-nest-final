import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { TicketsGraphModule } from './tickets-graph/tickets-graph.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { FileManagmentModule } from './file-managment/file-managment.module';
import { ConfigService } from 'aws-sdk';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TicketsModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [
        // ApolloServerPluginLandingPageLocalDefault
      ]
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: 'cencoDB1234',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TicketsGraphModule,
    FileManagmentModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
