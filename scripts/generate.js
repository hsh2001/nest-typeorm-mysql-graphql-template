/* eslint-disable @typescript-eslint/no-var-requires */

const { kebabize, camelize, setFirstCharToUpperCase } = require('./case');

const fs = require('fs');
const spawn = require('child_process').spawnSync;

const [domainName] = process.argv.slice(2);

const kebabCasedDomainName = kebabize(domainName);
const camelCasedDomainName = camelize(domainName).replace(/\-/g, '');
const capitalCasedDomainName = setFirstCharToUpperCase(camelCasedDomainName);

spawn(`nest`, ['g', 'mo', kebabCasedDomainName]);

// Create Entity
fs.writeFileSync(
  `src/${kebabCasedDomainName}/${kebabCasedDomainName}.entity.ts`,
  `
    import { Field, ID, ObjectType } from '@nestjs/graphql';
    import {
        CreateDateColumn,
        DeleteDateColumn,
        Entity,
        PrimaryGeneratedColumn,
        UpdateDateColumn,
    } from 'typeorm';
    
    @Entity()
    @ObjectType()
    export class ${capitalCasedDomainName} {
        @Field(() => ID)
        @PrimaryGeneratedColumn({
        unsigned: true,
        })
        id: number;
    
        @CreateDateColumn()
        createAt: Date;
    
        @UpdateDateColumn()
        updateAt: Date;
    
        @DeleteDateColumn()
        deleteAt?: Date | null;
    }
    
      
      `,
);

// Create Repository
fs.writeFileSync(
  `src/${kebabCasedDomainName}/${kebabCasedDomainName}.repository.ts`,
  `
        import { Injectable } from '@nestjs/common';
        import { InjectDataSource } from '../database/database.provider';
        import { BaseMySQLRepository } from '../lib/database/repositories/base-mysql.repository';
        import { DataSource } from 'typeorm';
        import {${capitalCasedDomainName}} from './${kebabCasedDomainName}.entity';

        
        @Injectable()
        export class ${capitalCasedDomainName}Repository extends BaseMySQLRepository<${capitalCasedDomainName}> {
            constructor(
            @InjectDataSource()
            private readonly dataSource: DataSource,
            ) {
            super(dataSource.getRepository(${capitalCasedDomainName}));
            }
        }
  
    `,
);

// Create Service
fs.writeFileSync(
  `src/${kebabCasedDomainName}/${kebabCasedDomainName}.service.ts`,
  `
    import { Injectable } from '@nestjs/common';
    import {${capitalCasedDomainName}Repository} from './${kebabCasedDomainName}.repository';

    @Injectable()
    export class ${capitalCasedDomainName}Service {
        constructor(private readonly ${camelCasedDomainName}Repository: ${capitalCasedDomainName}Repository) {}
    }
  
  `,
);

// Create Resolver
fs.writeFileSync(
  `src/${kebabCasedDomainName}/${kebabCasedDomainName}.resolver.ts`,
  `
        import { Resolver } from '@nestjs/graphql';
        import {${capitalCasedDomainName}Service} from './${kebabCasedDomainName}.service';
        import {${capitalCasedDomainName}Repository} from './${kebabCasedDomainName}.repository';
    
        @Resolver()
        export class ${capitalCasedDomainName}Resolver {
            constructor(
              private readonly ${camelCasedDomainName}Repository: ${capitalCasedDomainName}Repository,
              private readonly ${camelCasedDomainName}Service: ${capitalCasedDomainName}Service,
            ) {}
        }
      
      `,
);

// Fix Module
fs.writeFileSync(
  `src/${kebabCasedDomainName}/${kebabCasedDomainName}.module.ts`,
  `
    import { Module } from '@nestjs/common';
    import { ${capitalCasedDomainName}Service } from './${kebabCasedDomainName}.service';
    import { ${capitalCasedDomainName}Repository } from './${kebabCasedDomainName}.repository';
    import { ${capitalCasedDomainName}Resolver } from './${kebabCasedDomainName}.resolver';
    
    @Module({
        providers: [${capitalCasedDomainName}Service ,${capitalCasedDomainName}Repository ,${capitalCasedDomainName}Resolver ,],
        exports: [${capitalCasedDomainName}Service ,${capitalCasedDomainName}Repository ,]
    })
    export class ${capitalCasedDomainName}Module {}
  
      `,
);

spawn('pnpm', ['prettier', '--write', `src/${kebabCasedDomainName}`]);
