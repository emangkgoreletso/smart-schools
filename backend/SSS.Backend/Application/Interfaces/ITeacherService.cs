using SSS.Backend.Application.DTOs;

namespace SSS.Backend.Application.Interfaces;

public interface ITeacherService
{
    Task<IEnumerable<TeacherDTO>> GetTeachers();
}