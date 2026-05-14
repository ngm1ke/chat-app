import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778743949579 implements MigrationInterface {
    name = 'Init1778743949579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "date_of_birth" date, "role" "public"."users_role_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "positions" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e21258bdc3692b44960c623940f" UNIQUE ("code"), CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classes" ("id" SERIAL NOT NULL, "class_name" character varying NOT NULL, "grade" integer NOT NULL, "homeroom_teacher_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_positions" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "position_id" integer NOT NULL, "class_id" integer, "assigned_at" TIMESTAMP NOT NULL DEFAULT now(), "ended_at" TIMESTAMP, "assigned_by" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_356d199f37e9af66ec22f3d5de4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_5f17c07d8e2590c3c148b173363" FOREIGN KEY ("homeroom_teacher_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_positions" ADD CONSTRAINT "FK_d12a8d0944b6bc37fad84f31c33" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_positions" ADD CONSTRAINT "FK_2c636699f9917225459a8eab59d" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_positions" ADD CONSTRAINT "FK_ad725c974e04cce37546a5c90e0" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_positions" ADD CONSTRAINT "FK_536ef9150b8531e0cce694142a9" FOREIGN KEY ("assigned_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_positions" DROP CONSTRAINT "FK_536ef9150b8531e0cce694142a9"`);
        await queryRunner.query(`ALTER TABLE "user_positions" DROP CONSTRAINT "FK_ad725c974e04cce37546a5c90e0"`);
        await queryRunner.query(`ALTER TABLE "user_positions" DROP CONSTRAINT "FK_2c636699f9917225459a8eab59d"`);
        await queryRunner.query(`ALTER TABLE "user_positions" DROP CONSTRAINT "FK_d12a8d0944b6bc37fad84f31c33"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_5f17c07d8e2590c3c148b173363"`);
        await queryRunner.query(`DROP TABLE "user_positions"`);
        await queryRunner.query(`DROP TABLE "classes"`);
        await queryRunner.query(`DROP TABLE "positions"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
