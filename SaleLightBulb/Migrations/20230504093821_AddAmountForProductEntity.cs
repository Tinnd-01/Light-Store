using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaleLightBulb.Migrations
{
    /// <inheritdoc />
    public partial class AddAmountForProductEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Voltage",
                table: "Products",
                newName: "VoltageOrPowerCapacity");

            migrationBuilder.RenameColumn(
                name: "PowerCapacity",
                table: "Products",
                newName: "Color");

            migrationBuilder.AddColumn<int>(
                name: "Amount",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "VoltageOrPowerCapacity",
                table: "Products",
                newName: "Voltage");

            migrationBuilder.RenameColumn(
                name: "Color",
                table: "Products",
                newName: "PowerCapacity");
        }
    }
}
