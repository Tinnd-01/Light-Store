using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaleLightBulb.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUnusedProductProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_User_AddedByUserId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_AddedByUserId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "AddedByUserId",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AddedByUserId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Products_AddedByUserId",
                table: "Products",
                column: "AddedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_User_AddedByUserId",
                table: "Products",
                column: "AddedByUserId",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}
