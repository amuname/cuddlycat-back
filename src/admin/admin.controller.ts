import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('')
  adminPge() {
    return this.adminService.generateAdminHTMLPage();
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('getCompanyFields')
  getCompanyFields() {
    return this.adminService.getCompanyFields();
  }
}
