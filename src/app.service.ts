import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { log } from 'console';

@Injectable()
export class AppService {
    constructor() {
        this.createS3Bucket();
    }

    private async createS3Bucket() {

        const s3 = new S3();

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
        };

        s3.headBucket(params)
            .promise()
            .then(() => {
                console.log('Bucket Name MUST be unique, change it in .env file');
                throw new InternalServerErrorException('Bucket Name MUST be unique, change it in .env file')
            })
            .catch((error) => {
                if (error.code === 'NotFound') {
                    s3.createBucket({ ...params, ACL: 'public-read' })
                        .promise()
                        .then(() => {
                            console.log('S3 Bucket created successfully');
                        })
                        .catch((error) => {
                            throw new InternalServerErrorException('Error while creating S3 Bucket, check logs...')
                        });
                }
                if (error.statusCode === 400) {
                    console.log('Error while creating S3 Bucket, check logs. Check if credentials are configured correctly');
                }
            });
    }
}