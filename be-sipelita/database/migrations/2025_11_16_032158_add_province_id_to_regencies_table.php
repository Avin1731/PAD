<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('regencies', function (Blueprint $table) {
            $table->string('province_id')->nullable()->after('name'); // Tambah kolom province_id
            
            // Tambah foreign key constraint (optional)
            $table->foreign('province_id')
                  ->references('id')
                  ->on('provinces')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('regencies', function (Blueprint $table) {
            $table->dropForeign(['province_id']);
            $table->dropColumn('province_id');
        });
    }
};